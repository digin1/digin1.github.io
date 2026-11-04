import Link from 'next/link';

export default function CTASection({ className = '' }) {
  return (
    <section id="contact" className={`editorial-container editorial-contact ${className}`} aria-labelledby="cta-heading">
      <div className="contact-panel">
        <div><p className="eyebrow">A conversation starts something.</p><h2 id="cta-heading">Let’s build something<br /><em>worth making.</em></h2></div>
        <div><p>Research software, scientific tooling, infrastructure, or an idea that needs a thoughtful engineering partner. I’d love to hear about it.</p><Link href="/contact/" className="btn-primary">Let’s talk <span aria-hidden="true">↗</span></Link></div>
      </div>
    </section>
  );
}
