'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faMoon } from '@fortawesome/free-solid-svg-icons';
import { useTheme } from '@/context/ThemeContext';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const { theme, toggleTheme } = useTheme();

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Projects', path: '/projects' },
    { name: 'Blog', path: '/blog' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  return (
    <header
      className={`fixed w-full top-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'py-3 bg-white/80 dark:bg-deep-space/80 backdrop-blur-xl border-b border-light-border dark:border-slate-700/50 shadow-lg shadow-black/5 dark:shadow-black/20'
          : 'py-5 bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="group flex items-center gap-2">
            <motion.div
              className="relative"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              <span className="text-xl md:text-2xl font-display font-bold text-light-text dark:text-ghost-white">
                Digin
                <span className="text-gradient"> Dominic</span>
              </span>
            </motion.div>
            <span className="w-2 h-2 rounded-full bg-signal-green animate-pulse" />
          </Link>

          {/* Desktop Navigation */}
          <ul className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <li key={item.path}>
                <Link
                  href={item.path}
                  className={`relative px-4 py-2 rounded-full font-medium transition-all duration-300 ${
                    pathname === item.path
                      ? 'text-light-text dark:text-ghost-white'
                      : 'text-light-text-secondary dark:text-muted-steel hover:text-light-text dark:hover:text-ghost-white'
                  }`}
                >
                  {pathname === item.path && (
                    <motion.span
                      layoutId="navbar-indicator"
                      className="absolute inset-0 rounded-full bg-light-surface dark:bg-midnight-steel/80 border border-light-border dark:border-slate-700/50"
                      transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                  <span className="relative z-10">{item.name}</span>
                </Link>
              </li>
            ))}
          </ul>

          {/* Right side: Theme toggle + CTA */}
          <div className="hidden md:flex items-center gap-4">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-light-surface dark:bg-midnight-steel/50 border border-light-border dark:border-slate-700/50 text-light-text dark:text-ghost-white hover:border-neural-blue/50 transition-all duration-300"
              aria-label="Toggle theme"
            >
              <FontAwesomeIcon icon={theme === 'dark' ? faSun : faMoon} className="w-5 h-5" />
            </button>

            {/* Contact Button */}
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-neural-blue to-synapse-cyan text-white font-medium text-sm transition-all duration-300 hover:shadow-glow-blue hover:-translate-y-0.5"
            >
              <span className="w-2 h-2 rounded-full bg-white/80" />
              Let's Talk
            </Link>
          </div>

          {/* Mobile: Theme toggle + Menu Button */}
          <div className="md:hidden flex items-center gap-2">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-light-surface dark:bg-midnight-steel/50 border border-light-border dark:border-slate-700/50 text-light-text dark:text-ghost-white"
              aria-label="Toggle theme"
            >
              <FontAwesomeIcon icon={theme === 'dark' ? faSun : faMoon} className="w-4 h-4" />
            </button>

            <button
              className="relative w-10 h-10 flex items-center justify-center rounded-lg bg-light-surface dark:bg-midnight-steel/50 border border-light-border dark:border-slate-700/50 text-light-text dark:text-ghost-white focus:outline-none focus:ring-2 focus:ring-neural-blue/50"
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
              className="md:hidden mt-4 pb-4"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <motion.div
                className="flex flex-col gap-2 p-4 rounded-xl bg-white/90 dark:bg-midnight-steel/80 backdrop-blur-xl border border-light-border dark:border-slate-700/50"
                initial={{ y: -10 }}
                animate={{ y: 0 }}
                exit={{ y: -10 }}
              >
                {navItems.map((item, index) => (
                  <motion.div
                    key={item.path}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Link
                      href={item.path}
                      className={`block py-3 px-4 rounded-lg transition-all duration-300 ${
                        pathname === item.path
                          ? 'bg-neural-blue/10 text-neural-blue border border-neural-blue/20'
                          : 'text-light-text-secondary dark:text-muted-steel hover:bg-light-surface dark:hover:bg-slate-700/30 hover:text-light-text dark:hover:text-ghost-white'
                      }`}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  </motion.div>
                ))}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: navItems.length * 0.05 }}
                >
                  <Link
                    href="/contact"
                    className="block mt-2 py-3 px-4 rounded-lg bg-gradient-to-r from-neural-blue to-synapse-cyan text-white font-medium text-center"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Let's Talk
                  </Link>
                </motion.div>
              </motion.div>
            </motion.nav>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
