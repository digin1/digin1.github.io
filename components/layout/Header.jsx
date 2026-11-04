'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faMoon } from '@fortawesome/free-solid-svg-icons';
import { useTheme } from '@/context/ThemeContext';

const links = [
  { name: 'Selected work', path: '/projects/' },
  { name: 'Publications', path: '/publications/' },
  { name: 'Writing', path: '/blog/' },
  { name: 'About', path: '/about/' },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname() || '/';
  const { theme, toggleTheme, mounted } = useTheme();
  const button = useRef(null);
  const menu = useRef(null);
  useEffect(() => { setOpen(false); }, [pathname]);
  useEffect(() => {
    if (!open) return;
    menu.current?.querySelector('a')?.focus();
    const onKey = event => {
      if (event.key === 'Escape') { setOpen(false); button.current?.focus(); }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open]);
  const current = path => pathname.replace(/\/$/, '') === path.replace(/\/$/, '') || pathname.startsWith(path);
  const navLinks = links.map(link => <Link key={link.path} href={link.path} aria-current={current(link.path) ? 'page' : undefined}>{link.name}</Link>);
  return (
    <header className="site-header">
      <div className="editorial-container">
        <div className="header-row">
          <Link href="/" className="editorial-brand" aria-label="Digin Dominic, home"><span className="brand-mark" aria-hidden="true">d.</span><span>Digin Dominic</span></Link>
          <nav className="desktop-nav" aria-label="Main">{navLinks}<Link href="/contact/" className="header-contact" aria-current={current('/contact/') ? 'page' : undefined}>Let’s talk <span aria-hidden="true">↗</span></Link></nav>
          <div className="header-controls">
            <button type="button" onClick={toggleTheme} className="theme-toggle" aria-label={mounted ? `Switch to ${theme === 'dark' ? 'light' : 'dark'} theme` : 'Toggle theme'}><FontAwesomeIcon icon={mounted && theme === 'dark' ? faSun : faMoon} aria-hidden="true" /></button>
            <button ref={button} type="button" className="menu-toggle" onClick={() => setOpen(v => !v)} aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open} aria-controls="mobile-menu"><span aria-hidden="true">{open ? '×' : '☰'}</span></button>
          </div>
        </div>
        {open && <nav ref={menu} id="mobile-menu" className="mobile-nav" aria-label="Mobile"><Link href="/">Home</Link>{navLinks}<Link href="/contact/">Let’s talk <span aria-hidden="true">↗</span></Link><a href="/Digin_Dominic_Resume.pdf" target="_blank" rel="noopener noreferrer">Resume (PDF) <span aria-hidden="true">↗</span></a></nav>}
      </div>
    </header>
  );
}
