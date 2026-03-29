'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faArrowRight,
  faCheck,
  faEnvelope,
  faExclamationTriangle,
  faLocationDot,
  faPaperPlane,
  faPhone,
  faUser,
} from '@fortawesome/free-solid-svg-icons';
import { faGithub, faLinkedinIn, faXTwitter } from '@fortawesome/free-brands-svg-icons';

const contactTopics = [
  'Research software engineering',
  'Microscopy tooling and data workflows',
  'Browser-based visualisation',
  'Infrastructure-heavy engineering work',
  'Scientific platforms and internal tools',
];

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
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
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

  const socialLinks = [
    { href: 'https://github.com/digin1', icon: faGithub, label: 'GitHub' },
    { href: 'https://www.linkedin.com/in/digin/', icon: faLinkedinIn, label: 'LinkedIn' },
    { href: 'https://x.com/digin1', icon: faXTwitter, label: 'X' },
  ];

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-10">
      <div className="mx-auto max-w-6xl">
        <motion.header
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.42 }}
          className="border-b border-light-border pb-8 dark:border-zinc-800"
        >
          <span className="eyebrow mb-4">Contact</span>
          <h1 className="max-w-[13ch] font-display font-bold text-[2.7rem] leading-[0.98] tracking-tight text-light-text dark:text-ghost-white sm:text-[3.3rem]">
            Open to research software and technical collaboration.
          </h1>
          <p className="mt-5 max-w-[62ch] text-[1.03rem] leading-8 text-light-text-secondary dark:text-muted-steel">
            If you&apos;re working on scientific tooling, data workflows, visualisation, or infrastructure-heavy systems, send me the context and I&apos;ll have a quick look. The fastest route is still a direct email.
          </p>
        </motion.header>

        <div className="mt-8 grid gap-8 lg:grid-cols-[360px_minmax(0,1fr)]">
          <aside className="space-y-5">
            <div className="editorial-card p-5 sm:p-6">
              <p className="meta-label">Direct contact</p>
              <div className="mt-4 space-y-4">
                <a
                  href={`mailto:${email}`}
                  className="flex items-start gap-3 rounded-xl border border-light-border/80 bg-light-surface/80 p-4 hover:border-neural-blue/40 dark:border-zinc-800 dark:bg-zinc-900"
                >
                  <span className="mt-0.5 flex h-9 w-9 items-center justify-center rounded-xl bg-neural-blue/10 text-neural-blue">
                    <FontAwesomeIcon icon={faEnvelope} className="h-4 w-4" />
                  </span>
                  <div className="min-w-0">
                    <p className="meta-label">Email</p>
                    <p className="mt-2 break-all text-sm font-semibold leading-6 text-light-text dark:text-ghost-white">
                      {email}
                    </p>
                  </div>
                </a>

                {phone ? (
                  <a
                    href={`tel:${phone}`}
                    className="flex items-start gap-3 rounded-xl border border-light-border/80 bg-light-surface/80 p-4 hover:border-neural-blue/40 dark:border-zinc-800 dark:bg-zinc-900"
                  >
                    <span className="mt-0.5 flex h-9 w-9 items-center justify-center rounded-xl bg-neural-blue/10 text-neural-blue">
                      <FontAwesomeIcon icon={faPhone} className="h-4 w-4" />
                    </span>
                    <div>
                      <p className="meta-label">Phone</p>
                      <p className="mt-2 text-sm font-semibold leading-6 text-light-text dark:text-ghost-white">
                        {phone}
                      </p>
                    </div>
                  </a>
                ) : null}

                <div className="flex items-start gap-3 rounded-xl border border-light-border/80 bg-light-surface/80 p-4 dark:border-zinc-800 dark:bg-zinc-900">
                  <span className="mt-0.5 flex h-9 w-9 items-center justify-center rounded-xl bg-neural-blue/10 text-neural-blue">
                    <FontAwesomeIcon icon={faLocationDot} className="h-4 w-4" />
                  </span>
                  <div>
                    <p className="meta-label">Location</p>
                    <p className="mt-2 text-sm font-semibold leading-6 text-light-text dark:text-ghost-white">
                      {location}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="editorial-card p-5 sm:p-6">
              <p className="meta-label">Good topics to send</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {contactTopics.map((topic) => (
                  <span key={topic} className="tag">
                    {topic}
                  </span>
                ))}
              </div>
              <p className="mt-4 text-sm leading-7 text-light-text-secondary dark:text-muted-steel">
                A short message with the problem, constraints, and desired outcome is more useful than a long preamble.
              </p>
            </div>

            <div className="editorial-card p-5 sm:p-6">
              <p className="meta-label">Elsewhere</p>
              <div className="mt-4 flex flex-wrap gap-3">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-light-border bg-light-surface text-light-text-secondary hover:border-neural-blue/40 hover:text-neural-blue dark:border-zinc-800 dark:bg-zinc-900 dark:text-muted-steel"
                    aria-label={social.label}
                  >
                    <FontAwesomeIcon icon={social.icon} className="h-4 w-4" />
                  </a>
                ))}
              </div>
              <div className="mt-5 flex flex-wrap gap-3">
                <Link href="/projects" className="btn-secondary">
                  View work
                </Link>
                <Link href="/about" className="btn-secondary">
                  Read profile
                </Link>
              </div>
            </div>
          </aside>

          <section className="editorial-card p-5 sm:p-6 md:p-8">
            <div className="border-b border-light-border pb-5 dark:border-zinc-800">
              <p className="meta-label">Send a message</p>
              <h2 className="mt-3 text-[1.65rem] font-display font-bold tracking-tight text-light-text dark:text-ghost-white">
                Start with the actual problem.
              </h2>
              <p className="mt-3 max-w-[58ch] text-sm leading-7 text-light-text-secondary dark:text-muted-steel">
                What are you building, what is difficult about it, and where do you need help?
              </p>
            </div>

            {status === 'success' ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-12 text-center"
              >
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-signal-green/30 bg-signal-green/10 text-signal-green">
                  <FontAwesomeIcon icon={faCheck} className="h-5 w-5" />
                </div>
                <h3 className="mt-5 text-xl font-display font-bold text-light-text dark:text-ghost-white">
                  Message sent.
                </h3>
                <p className="mt-3 max-w-[36ch] mx-auto text-sm leading-7 text-light-text-secondary dark:text-muted-steel">
                  I&apos;ll get back to you as soon as I can.
                </p>
                <button onClick={() => setStatus('idle')} className="btn-secondary mt-6">
                  Send another message
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="mt-6 space-y-5">
                <div className="grid gap-5 md:grid-cols-2">
                  <div>
                    <label htmlFor="name" className="meta-label">
                      Name
                    </label>
                    <div className="relative mt-2">
                      <FontAwesomeIcon icon={faUser} className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-light-text-secondary dark:text-muted-steel" />
                      <input
                        id="name"
                        name="name"
                        type="text"
                        value={formData.name}
                        onChange={handleChange}
                        className={`w-full rounded-xl border bg-light-surface py-3 pl-11 pr-4 text-sm text-light-text outline-none placeholder:text-light-text-secondary focus:border-neural-blue dark:bg-zinc-900 dark:text-ghost-white dark:placeholder:text-muted-steel ${
                          errors.name ? 'border-red-500' : 'border-light-border dark:border-zinc-800'
                        }`}
                        placeholder="Your name"
                      />
                    </div>
                    {errors.name ? (
                      <p className="mt-2 flex items-center gap-2 text-sm text-red-500">
                        <FontAwesomeIcon icon={faExclamationTriangle} className="h-3.5 w-3.5" />
                        {errors.name}
                      </p>
                    ) : null}
                  </div>

                  <div>
                    <label htmlFor="email" className="meta-label">
                      Email
                    </label>
                    <div className="relative mt-2">
                      <FontAwesomeIcon icon={faEnvelope} className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-light-text-secondary dark:text-muted-steel" />
                      <input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        className={`w-full rounded-xl border bg-light-surface py-3 pl-11 pr-4 text-sm text-light-text outline-none placeholder:text-light-text-secondary focus:border-neural-blue dark:bg-zinc-900 dark:text-ghost-white dark:placeholder:text-muted-steel ${
                          errors.email ? 'border-red-500' : 'border-light-border dark:border-zinc-800'
                        }`}
                        placeholder="you@example.com"
                      />
                    </div>
                    {errors.email ? (
                      <p className="mt-2 flex items-center gap-2 text-sm text-red-500">
                        <FontAwesomeIcon icon={faExclamationTriangle} className="h-3.5 w-3.5" />
                        {errors.email}
                      </p>
                    ) : null}
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="meta-label">
                    Subject
                  </label>
                  <input
                    id="subject"
                    name="subject"
                    type="text"
                    value={formData.subject}
                    onChange={handleChange}
                    className="mt-2 w-full rounded-xl border border-light-border bg-light-surface px-4 py-3 text-sm text-light-text outline-none placeholder:text-light-text-secondary focus:border-neural-blue dark:border-zinc-800 dark:bg-zinc-900 dark:text-ghost-white dark:placeholder:text-muted-steel"
                    placeholder="A short subject line"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="meta-label">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={8}
                    className={`mt-2 w-full rounded-xl border bg-light-surface px-4 py-3 text-sm leading-7 text-light-text outline-none placeholder:text-light-text-secondary focus:border-neural-blue dark:bg-zinc-900 dark:text-ghost-white dark:placeholder:text-muted-steel ${
                      errors.message ? 'border-red-500' : 'border-light-border dark:border-zinc-800'
                    }`}
                    placeholder="What are you building, what is hard about it, and what kind of help or collaboration are you looking for?"
                  />
                  {errors.message ? (
                    <p className="mt-2 flex items-center gap-2 text-sm text-red-500">
                      <FontAwesomeIcon icon={faExclamationTriangle} className="h-3.5 w-3.5" />
                      {errors.message}
                    </p>
                  ) : null}
                </div>

                <div className="flex flex-wrap items-center justify-between gap-4 border-t border-light-border pt-5 dark:border-zinc-800">
                  <p className="max-w-[40ch] text-sm leading-7 text-light-text-secondary dark:text-muted-steel">
                    Your message will be sent directly to me. I typically reply within a day.
                  </p>
                  <button
                    type="submit"
                    disabled={status === 'submitting'}
                    className="btn-primary disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    <FontAwesomeIcon icon={faPaperPlane} className="h-3.5 w-3.5" />
                    {status === 'submitting' ? 'Sending...' : status === 'error' ? 'Failed — try again' : 'Send message'}
                  </button>
                </div>
              </form>
            )}
          </section>
        </div>
      </div>
    </div>
  );
}
