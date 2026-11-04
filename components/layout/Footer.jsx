import Link from 'next/link';
import SocialLinks from '@/components/common/SocialLinks';
import { CookieSettingsButton } from '@/components/layout/CookieConsent';

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="editorial-container">
        <div className="footer-top">
          <div><Link href="/" className="editorial-brand"><span className="brand-mark" aria-hidden="true">d.</span>Digin Dominic</Link><p>Software with purpose.<br />Research, systems, and visualisation.</p></div>
          <nav aria-label="Footer"><Link href="/projects/">Work</Link><Link href="/publications/">Publications</Link><Link href="/blog/">Writing</Link><Link href="/about/">About</Link><Link href="/contact/">Contact</Link></nav>
          <div className="footer-social"><SocialLinks include={['GitHub', 'LinkedIn', 'Email']} /><a href="/Digin_Dominic_Resume.pdf" target="_blank" rel="noopener noreferrer" className="editorial-text-link mt-4">Resume (PDF) <span aria-hidden="true">↗</span></a></div>
        </div>
        <div className="footer-bottom"><p>© {new Date().getFullYear()} Digin Dominic. All rights reserved.</p><div><Link href="/privacy/">Privacy</Link><CookieSettingsButton /></div></div>
      </div>
    </footer>
  );
}
