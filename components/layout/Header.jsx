'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faMoon, faArrowUpRightFromSquare, faHouse } from '@fortawesome/free-solid-svg-icons';
import { useTheme } from '@/context/ThemeContext';

const navItems = [
  { name: 'Work', path: '/projects/' },
  { name: 'Writing', path: '/blog/' },
  { name: 'Publications', path: '/publications/' },
  { name: 'About', path: '/about/' },
  { name: 'Contact', path: '/contact/' },
];

const linkBase = 'rounded-lg text-sm transition-colors';
const linkIdle = 'text-light-text-secondary hover:text-light-text dark:text-muted-steel dark:hover:text-ghost-white';
const linkActive = 'bg-neural-blue/10 text-neural-blue';

function ThemeToggle({ theme, toggleTheme, mounted }) {
  const next = theme === 'dark' ? 'light' : 'dark';
  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-light-border bg-light-surface text-light-text-secondary hover:text-light-text dark:border-zinc-800 dark:bg-zinc-900 dark:text-muted-steel dark:hover:text-ghost-white"
      aria-label={mounted ? `Switch to ${next} theme` : 'Toggle theme'}
    >
      {mounted && <FontAwesomeIcon icon={theme === 'dark' ? faSun : faMoon} className="h-4 w-4" aria-hidden="true" />}
    </button>
  );
}

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname() || '/';
  const { theme, toggleTheme, mounted } = useTheme();
  const menuButtonRef = useRef(null);
  const menuRef = useRef(null);

  // Close the menu on navigation.
  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  // While the menu is open: Escape closes it and returns focus to the button.
  useEffect(() => {
    if (!isMenuOpen) return undefined;
    menuRef.current?.querySelector('a')?.focus();
    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        setIsMenuOpen(false);
        menuButtonRef.current?.focus();
      }
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [isMenuOpen]);

  const isActive = (path) => {
    if (path === '/') return pathname === '/';
    const base = path.replace(/\/$/, '');
    return pathname === base || pathname.startsWith(`${base}/`);
  };

  const ariaCurrent = (path) => (isActive(path) ? 'page' : undefined);

  return (
    <header className="fixed top-0 z-50 w-full glass-header">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex min-h-[72px] items-center justify-between gap-4">
          <Link href="/" className="text-[1.1rem] font-bold tracking-tight text-light-text dark:text-ghost-white">
            Digin Dominic
          </Link>

          {/* Desktop navigation */}
          <nav aria-label="Main" className="hidden md:block">
            <ul className="flex items-center gap-1 lg:gap-2">
              <li>
                <Link
                  href="/"
                  aria-label="Home"
                  aria-current={ariaCurrent('/')}
                  className={`inline-flex items-center justify-center px-2.5 py-2 ${linkBase} ${isActive('/') ? linkActive : linkIdle}`}
                >
                  <FontAwesomeIcon icon={faHouse} className="h-3.5 w-3.5" aria-hidden="true" />
                </Link>
              </li>
              {navItems.map((item) => (
                <li key={item.path}>
                  <Link
                    href={item.path}
                    aria-current={ariaCurrent(item.path)}
                    className={`px-3 py-2 ${linkBase} ${isActive(item.path) ? linkActive : linkIdle}`}
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="hidden items-center gap-2 md:flex">
            <a href="/Digin_Dominic_Resume.pdf" target="_blank" rel="noopener noreferrer" className="btn-secondary">
              Resume
              <FontAwesomeIcon icon={faArrowUpRightFromSquare} className="h-3.5 w-3.5" aria-hidden="true" />
            </a>
            <ThemeToggle theme={theme} toggleTheme={toggleTheme} mounted={mounted} />
          </div>

          {/* Mobile: theme toggle + menu button */}
          <div className="flex items-center gap-2 md:hidden">
            <ThemeToggle theme={theme} toggleTheme={toggleTheme} mounted={mounted} />
            <button
              ref={menuButtonRef}
              type="button"
              className="flex h-10 w-10 items-center justify-center rounded-lg border border-light-border bg-light-surface text-light-text dark:border-zinc-800 dark:bg-zinc-900 dark:text-ghost-white"
              onClick={() => setIsMenuOpen((open) => !open)}
              aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isMenuOpen}
              aria-controls="mobile-menu"
            >
              <span className="relative h-4 w-5" aria-hidden="true">
                <motion.span
                  className="absolute left-0 h-0.5 w-full rounded-full bg-current"
                  animate={{ top: isMenuOpen ? '50%' : '0%', rotate: isMenuOpen ? 45 : 0, translateY: isMenuOpen ? '-50%' : 0 }}
                  transition={{ duration: 0.2 }}
                />
                <motion.span
                  className="absolute left-0 top-1/2 h-0.5 w-full -translate-y-1/2 rounded-full bg-current"
                  animate={{ opacity: isMenuOpen ? 0 : 1 }}
                  transition={{ duration: 0.2 }}
                />
                <motion.span
                  className="absolute left-0 h-0.5 w-full rounded-full bg-current"
                  animate={{ bottom: isMenuOpen ? '50%' : '0%', rotate: isMenuOpen ? -45 : 0, translateY: isMenuOpen ? '50%' : 0 }}
                  transition={{ duration: 0.2 }}
                />
              </span>
            </button>
          </div>
        </div>

        {/* Mobile navigation */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.nav
              id="mobile-menu"
              ref={menuRef}
              aria-label="Mobile"
              className="overflow-hidden pb-4 md:hidden"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
            >
              <ul className="flex flex-col gap-1 rounded-lg border border-light-border bg-light-surface p-4 dark:border-zinc-800 dark:bg-zinc-900">
                <li>
                  <Link
                    href="/"
                    aria-current={ariaCurrent('/')}
                    className={`flex items-center gap-2 px-4 py-3 ${linkBase} ${isActive('/') ? linkActive : linkIdle}`}
                  >
                    <FontAwesomeIcon icon={faHouse} className="h-3.5 w-3.5" aria-hidden="true" />
                    Home
                  </Link>
                </li>
                {navItems.map((item) => (
                  <li key={item.path}>
                    <Link
                      href={item.path}
                      aria-current={ariaCurrent(item.path)}
                      className={`block px-4 py-3 ${linkBase} ${isActive(item.path) ? linkActive : linkIdle}`}
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
                <li className="mt-2">
                  <a
                    href="/Digin_Dominic_Resume.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary w-full py-3"
                  >
                    Resume
                    <FontAwesomeIcon icon={faArrowUpRightFromSquare} className="h-3.5 w-3.5" aria-hidden="true" />
                  </a>
                </li>
              </ul>
            </motion.nav>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
