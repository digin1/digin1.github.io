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
        // Light mode — clean whites
        'light-bg': '#FAFAFA',
        'light-surface': '#FFFFFF',
        'light-card': '#FFFFFF',
        'light-border': '#E4E4E7',
        'light-text': '#09090B',
        'light-text-secondary': '#52525B',

        // Dark mode — neutral zinc blacks (no blue tint)
        'deep-space': '#09090B',
        'midnight-steel': '#18181B',
        'ghost-white': '#FAFAFA',
        'muted-steel': '#A1A1AA',

        // Accent — teal (dark in light mode, bright in dark mode)
        'neural-blue': '#0E7490',
        'synapse-cyan': '#0891B2',
        'signal-green': '#4ADE80',
        'plasma-purple': '#A78BFA',

        // Category
        'category-research': '#22D3EE',
        'category-commercial': '#4ADE80',
        'category-personal': '#A78BFA',
      },
      fontFamily: {
        display: ['var(--font-geist-sans)', 'system-ui', 'sans-serif'],
        body: ['var(--font-geist-sans)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-geist-mono)', 'ui-monospace', 'monospace'],
        sans: ['var(--font-geist-sans)', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'hero': ['clamp(2.2rem, 4.5vw, 3.2rem)', { lineHeight: '1.1', letterSpacing: '-0.025em', fontWeight: '800' }],
        'page-title': ['clamp(1.6rem, 3vw, 2.2rem)', { lineHeight: '1.15', letterSpacing: '-0.02em', fontWeight: '700' }],
        'section-heading': ['clamp(1.3rem, 2.5vw, 1.75rem)', { lineHeight: '1.2', letterSpacing: '-0.015em', fontWeight: '700' }],
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
