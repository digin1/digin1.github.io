'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faMoon, faArrowUpRightFromSquare } from '@fortawesome/free-solid-svg-icons';
import { useTheme } from '@/context/ThemeContext';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const { theme, toggleTheme } = useTheme();

  const navItems = [
    { name: 'Work', path: '/projects' },
    { name: 'Writing', path: '/blog' },
    { name: 'Publications', path: '/publications' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  const isActive = (path) => {
    if (path === '/') return pathname === path;
    return pathname === path || pathname.startsWith(`${path}/`);
  };

  return (
    <header className="fixed top-0 z-50 w-full glass-header">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="flex min-h-[72px] items-center justify-between gap-4">
          {/* Logo */}
          <Link href="/" className="text-[1.1rem] font-bold tracking-tight text-light-text dark:text-ghost-white">
            Digin Dominic
          </Link>

          {/* Desktop Navigation */}
          <ul className="hidden md:flex items-center gap-1 lg:gap-2">
            {navItems.map((item) => (
              <li key={item.path}>
                <Link
                  href={item.path}
                  className={`rounded-lg px-3 py-2 text-sm ${
                    isActive(item.path)
                      ? 'bg-neural-blue/10 text-neural-blue'
                      : 'text-light-text-secondary hover:text-light-text dark:text-muted-steel dark:hover:text-ghost-white'
                  }`}
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>

          {/* Right side */}
          <div className="hidden md:flex items-center gap-2">
            <a
              href="/Digin_Dominic_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary"
            >
              Resume
              <FontAwesomeIcon icon={faArrowUpRightFromSquare} className="h-3.5 w-3.5" />
            </a>
            <button
              onClick={toggleTheme}
              className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-light-border bg-light-surface text-light-text-secondary hover:text-light-text dark:border-zinc-800 dark:bg-zinc-900 dark:text-muted-steel dark:hover:text-ghost-white"
              aria-label="Toggle theme"
            >
              <FontAwesomeIcon icon={theme === 'dark' ? faSun : faMoon} className="w-4 h-4" />
            </button>
          </div>

          {/* Mobile: Theme toggle + Menu */}
          <div className="md:hidden flex items-center gap-2">
            <button
              onClick={toggleTheme}
              className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-light-border bg-light-surface text-light-text-secondary dark:border-zinc-800 dark:bg-zinc-900 dark:text-muted-steel"
              aria-label="Toggle theme"
            >
              <FontAwesomeIcon icon={theme === 'dark' ? faSun : faMoon} className="w-4 h-4" />
            </button>
            <button
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-light-border bg-light-surface text-light-text dark:border-zinc-800 dark:bg-zinc-900 dark:text-ghost-white"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
              aria-expanded={isMenuOpen}
            >
              <div className="relative w-5 h-4">
                <motion.span
                  className="absolute left-0 w-full h-0.5 bg-current rounded-full"
                  animate={{
                    top: isMenuOpen ? '50%' : '0%',
                    rotate: isMenuOpen ? 45 : 0,
                    translateY: isMenuOpen ? '-50%' : 0,
                  }}
                  transition={{ duration: 0.2 }}
                />
                <motion.span
                  className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-0.5 bg-current rounded-full"
                  animate={{ opacity: isMenuOpen ? 0 : 1 }}
                  transition={{ duration: 0.2 }}
                />
                <motion.span
                  className="absolute left-0 w-full h-0.5 bg-current rounded-full"
                  animate={{
                    bottom: isMenuOpen ? '50%' : '0%',
                    rotate: isMenuOpen ? -45 : 0,
                    translateY: isMenuOpen ? '50%' : 0,
                  }}
                  transition={{ duration: 0.2 }}
                />
              </div>
            </button>
          </div>
        </nav>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.nav
              className="md:hidden pb-4"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
            >
              <div className="flex flex-col gap-1 rounded-2xl border border-light-border bg-light-surface p-4 dark:border-zinc-800 dark:bg-zinc-900">
                {navItems.map((item) => (
                  <Link
                    key={item.path}
                    href={item.path}
                    className={`rounded-lg px-4 py-3 text-sm transition-colors ${
                      isActive(item.path)
                        ? 'bg-neural-blue/10 text-neural-blue'
                        : 'text-light-text-secondary hover:text-light-text dark:text-muted-steel dark:hover:text-ghost-white'
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
                <a
                  href="/Digin_Dominic_Resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 inline-flex items-center justify-center gap-2 rounded-lg border border-neural-blue/30 bg-neural-blue px-4 py-3 text-sm font-medium text-deep-space"
                >
                  Resume
                  <FontAwesomeIcon icon={faArrowUpRightFromSquare} className="h-3.5 w-3.5" />
                </a>
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
