/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Editorial palette: warm paper and forest green
        'light-bg': '#F4F3EB',
        'light-surface': '#F8F7F1',
        'light-card': '#F8F7F1',
        'light-border': '#C9CFC3',
        'light-text': '#253D35',
        'light-text-secondary': '#59635A',

        // Complementary forest palette for the optional dark theme
        'deep-space': '#17271F',
        'midnight-steel': '#263C33',
        'ghost-white': '#F4F3EB',
        'muted-steel': '#ABB9AD',

        // Accents are CSS variables (see globals.css) so each one has a
        // light-mode and a dark-mode value that both pass WCAG AA contrast.
        'neural-blue': 'rgb(var(--accent-rgb) / <alpha-value>)',
        'synapse-cyan': 'rgb(var(--accent-hover-rgb) / <alpha-value>)',
        'signal-green': 'rgb(var(--success-rgb) / <alpha-value>)',
        'plasma-purple': 'rgb(var(--violet-rgb) / <alpha-value>)',

        // Category
        'category-research': '#22D3EE',
        'category-commercial': '#4ADE80',
        'category-personal': '#A78BFA',
      },
      fontFamily: {
        display: ['Georgia', 'Times New Roman', 'serif'],
        body: ['var(--font-geist-sans)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-geist-mono)', 'ui-monospace', 'monospace'],
        sans: ['var(--font-geist-sans)', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'hero': ['clamp(3rem, 5.4vw, 4.8rem)', { lineHeight: '1.1', letterSpacing: '-0.025em', fontWeight: '800' }],
        'page-title': ['clamp(1.9rem, 3.6vw, 2.6rem)', { lineHeight: '1.08', letterSpacing: '-0.025em', fontWeight: '700' }],
        'section-heading': ['clamp(1.7rem, 3vw, 2.5rem)', { lineHeight: '1.2', letterSpacing: '-0.015em', fontWeight: '700' }],
      },
      animation: {
        'fadeInUp': 'fadeInUp 0.5s ease-out forwards',
        'shimmer': 'shimmer 2s linear infinite',
      },
      keyframes: {
        fadeInUp: {
          'from': { opacity: '0', transform: 'translateY(12px)' },
          'to': { opacity: '1', transform: 'translateY(0)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
      boxShadow: {
        'card': '0 0 0 1px rgba(0,0,0,0.03), 0 1px 2px rgba(0,0,0,0.05)',
        'card-hover': '0 0 0 1px rgba(0,0,0,0.05), 0 8px 16px rgba(0,0,0,0.08)',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
