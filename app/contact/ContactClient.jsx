'use client';

import { useState } from 'react';
import Link from 'next/link';
import PageIntro from '@/components/editorial/PageIntro';
import SocialLinks from '@/components/common/SocialLinks';

const contactTopics = [
  'Research software engineering',
  'Microscopy tooling and data workflows',
  'Browser-based visualisation',
  'Infrastructure-heavy engineering work',
  'Scientific platforms and internal tools',
];

function Field({
  name,
  label,
  value,
  error,
  onChange,
  type = 'text',
  placeholder,
  autoComplete,
  required = false,
}) {
  return (
    <div className="contact-field">
      <label htmlFor={name}>
        {label}
        <span>{required ? 'Required' : 'Optional'}</span>
      </label>
      <input
        id={name}
        name={name}
        type={type}
        autoComplete={autoComplete}
        required={required}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${name}-error` : undefined}
      />
      {error && (
        <p id={`${name}-error`} className="form-error">
          {error}
        </p>
      )}
    </div>
  );
}

export default function ContactClient({ aboutContent }) {
  const metadata = aboutContent?.metadata || {};
  const email = metadata?.email || 'digin13dominic@gmail.com';
  const phone = metadata?.phone;
  const location = metadata?.location || 'Edinburgh, Scotland';

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [status, setStatus] = useState('idle');
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const nextErrors = {};
    if (!formData.name.trim()) nextErrors.name = 'Name is required';
    if (!formData.email.trim()) {
      nextErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      nextErrors.email = 'Please enter a valid email';
    }
    if (!formData.message.trim()) nextErrors.message = 'Message is required';
    setErrors(nextErrors);
    const firstInvalid = Object.keys(nextErrors)[0];
    if (firstInvalid) document.getElementById(firstInvalid)?.focus();
    return Object.keys(nextErrors).length === 0;
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
    if (status === 'error') {
      setStatus('idle');
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!validateForm()) return;

    setStatus('submitting');

    try {
      const res = await fetch('https://formspree.io/f/xjgpyeao', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          subject: formData.subject || `Contact from ${formData.name}`,
          message: formData.message,
        }),
      });

      if (res.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  return (
    <div className="editorial-container inner-page contact-page">
      <PageIntro
        number="05"
        label="Contact"
        title="Good work starts"
        accent="with a conversation."
        description="Research software, a difficult dataset, a useful tool waiting to be built. Tell me what you have in mind."
      >
        <p className="margin-note">
          {location}
          <br />
          Research / tools / systems
        </p>
      </PageIntro>
      <div className="contact-layout">
        <aside className="contact-information">
          <p className="eyebrow">The direct route</p>
          <a className="contact-email" href={`mailto:${email}`}>
            {email} <span aria-hidden="true">↗</span>
          </a>
          <p className="contact-introduction">
            A short message with the problem, constraints, and desired outcome is a great place to
            start. Direct email is always welcome.
          </p>
          <dl className="contact-particulars">
            <div>
              <dt>Based in</dt>
              <dd>{location}</dd>
            </div>
            {phone && (
              <div>
                <dt>Phone</dt>
                <dd>
                  <a href={`tel:${phone}`}>{phone}</a>
                </dd>
              </div>
            )}
          </dl>
          <section className="contact-topics" aria-labelledby="topics-heading">
            <h2 id="topics-heading" className="eyebrow">
              Things we could work on
            </h2>
            <ol>
              {contactTopics.map((topic, i) => (
                <li key={topic}>
                  <span>{String(i + 1).padStart(2, '0')}</span>
                  {topic}
                </li>
              ))}
            </ol>
          </section>
          <div className="contact-elsewhere">
            <p className="eyebrow">Find me elsewhere</p>
            <SocialLinks include={['GitHub', 'LinkedIn', 'X (Twitter)']} />
            <Link href="/projects/" className="editorial-text-link">
              Explore my work <span aria-hidden="true">↗</span>
            </Link>
          </div>
        </aside>
        <section className="contact-letter" aria-labelledby="message-heading">
          <p className="eyebrow">A note to Digin</p>
          <h2 id="message-heading">What are you working on?</h2>
          <p className="contact-letter-intro">
            What are you building, what’s difficult about it, and where could I help?
          </p>
          {status === 'success' ? (
            <div className="contact-success" role="status">
              <span className="success-symbol" aria-hidden="true">
                ✓
              </span>
              <h3>Your note is on its way.</h3>
              <p>Thanks for getting in touch. I’ll reply as soon as I can.</p>
              <button
                type="button"
                className="editorial-text-link"
                onClick={() => setStatus('idle')}
              >
                Send another message <span aria-hidden="true">↗</span>
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate className="editorial-contact-form">
              <div className="contact-field-pair">
                <Field
                  name="name"
                  label="Your name"
                  autoComplete="name"
                  value={formData.name}
                  error={errors.name}
                  onChange={handleChange}
                  placeholder="Your name"
                  required
                />
                <Field
                  name="email"
                  label="Email address"
                  type="email"
                  autoComplete="email"
                  value={formData.email}
                  error={errors.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  required
                />
              </div>
              <Field
                name="subject"
                label="Subject"
                value={formData.subject}
                onChange={handleChange}
                placeholder="A little context"
              />
              <div className="contact-field">
                <label htmlFor="message">
                  Your message <span>Required</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={7}
                  value={formData.message}
                  onChange={handleChange}
                  aria-invalid={Boolean(errors.message)}
                  aria-describedby={errors.message ? 'message-error' : undefined}
                  placeholder="The idea, the problem, the possibilities…"
                />
                {errors.message && (
                  <p id="message-error" className="form-error">
                    {errors.message}
                  </p>
                )}
              </div>
              {status === 'error' && (
                <p role="alert" className="form-error">
                  Your message couldn’t be sent. Please try again, or email me directly.
                </p>
              )}
              <div className="contact-send">
                <p>
                  Delivered by Formspree.
                  <br />
                  Your details are used only to reply. <Link href="/privacy/">Privacy</Link>
                </p>
                <button
                  type="submit"
                  disabled={status === 'submitting'}
                  className="btn-primary disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {status === 'submitting' ? 'Sending…' : 'Send message'}{' '}
                  <span aria-hidden="true">↗</span>
                </button>
              </div>
            </form>
          )}
        </section>
      </div>
    </div>
  );
}
