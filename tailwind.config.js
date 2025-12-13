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
        // Light mode colors
        'light-bg': '#FFFFFF',
        'light-surface': '#F8FAFC',
        'light-card': '#FFFFFF',
        'light-border': '#E2E8F0',
        'light-text': '#1E293B',
        'light-text-secondary': '#64748B',

        // Dark mode colors (Research Terminal Theme)
        'deep-space': '#0A0F1C',
        'midnight-steel': '#1A1F2E',
        'ghost-white': '#E2E8F0',
        'muted-steel': '#64748B',

        // Accent colors (shared)
        'neural-blue': '#3B82F6',
        'synapse-cyan': '#06B6D4',
        'signal-green': '#10B981',
        'plasma-purple': '#8B5CF6',

        // Category colors
        'category-research': '#3B82F6',
        'category-commercial': '#10B981',
        'category-personal': '#8B5CF6',

        // Liquid Glass theme colors
        'glass-white': 'rgba(255, 255, 255, 0.1)',
        'glass-border': 'rgba(255, 255, 255, 0.2)',
        'glass-highlight': 'rgba(255, 255, 255, 0.4)',
        'liquid-blue': 'rgba(59, 130, 246, 0.3)',
        'liquid-cyan': 'rgba(6, 182, 212, 0.3)',
        'liquid-purple': 'rgba(139, 92, 246, 0.3)',

        // Legacy colors
        primary: '#3B82F6',
        secondary: '#06B6D4',
        accent: '#10B981',
      },
      fontFamily: {
        display: ['Space Grotesk', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
        sans: ['Inter', 'sans-serif'],
        serif: ['Merriweather', 'Georgia', 'Cambria', '"Times New Roman"', 'Times', 'serif'],
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
        'float-slow': 'float 8s ease-in-out infinite',
        'float-delayed': 'float 6s ease-in-out 2s infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'gradient-x': 'gradient-x 3s ease infinite',
        'gradient-shift': 'gradient-shift 8s ease infinite',
        'shimmer': 'shimmer 2s linear infinite',
        'fadeInUp': 'fadeInUp 0.6s ease-out forwards',
        'slideInUp': 'slideInUp 0.8s cubic-bezier(0.25, 0.1, 0.25, 1) forwards',
        'slideInDown': 'slideInDown 0.8s cubic-bezier(0.25, 0.1, 0.25, 1) forwards',
        'scaleIn': 'scaleIn 0.5s cubic-bezier(0.25, 0.1, 0.25, 1) forwards',
        'morphBlob': 'morphBlob 8s ease-in-out infinite',
        'spin-slow': 'spin 20s linear infinite',
        'bounce-slow': 'bounce-slow 3s ease-in-out infinite',
        'draw-line': 'draw-line 2s ease-out forwards',
        'typewriter': 'typewriter 3s steps(40) forwards',
        'blink': 'blink 1s step-end infinite',
        'tilt': 'tilt 10s ease-in-out infinite',
        // Liquid glass animations
        'liquid-slow': 'liquid 8s ease-in-out infinite',
        'liquid-fast': 'liquid 4s ease-in-out infinite',
        'wobble': 'wobble 6s ease-in-out infinite',
        'ripple': 'ripple 2s ease-out infinite',
        'shine': 'shine 3s ease-in-out infinite',
        'glass-shimmer': 'glassShimmer 4s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 5px rgba(59, 130, 246, 0.5)' },
          '100%': { boxShadow: '0 0 20px rgba(59, 130, 246, 0.8), 0 0 40px rgba(59, 130, 246, 0.4)' },
        },
        'gradient-x': {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        'gradient-shift': {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        fadeInUp: {
          'from': { opacity: '0', transform: 'translateY(20px)' },
          'to': { opacity: '1', transform: 'translateY(0)' },
        },
        slideInUp: {
          'from': { opacity: '0', transform: 'translateY(60px)' },
          'to': { opacity: '1', transform: 'translateY(0)' },
        },
        slideInDown: {
          'from': { opacity: '0', transform: 'translateY(-60px)' },
          'to': { opacity: '1', transform: 'translateY(0)' },
        },
        scaleIn: {
          'from': { opacity: '0', transform: 'scale(0.9)' },
          'to': { opacity: '1', transform: 'scale(1)' },
        },
        morphBlob: {
          '0%, 100%': { borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%' },
          '50%': { borderRadius: '30% 60% 70% 40% / 50% 60% 30% 60%' },
        },
        'bounce-slow': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'draw-line': {
          'from': { strokeDashoffset: '1000' },
          'to': { strokeDashoffset: '0' },
        },
        typewriter: {
          'from': { width: '0' },
          'to': { width: '100%' },
        },
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
        tilt: {
          '0%, 100%': { transform: 'rotate(-1deg)' },
          '50%': { transform: 'rotate(1deg)' },
        },
        // Liquid glass keyframes
        liquid: {
          '0%, 100%': {
            borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%',
            transform: 'rotate(0deg) scale(1)',
          },
          '25%': {
            borderRadius: '30% 60% 70% 40% / 50% 60% 30% 60%',
          },
          '50%': {
            borderRadius: '40% 60% 60% 40% / 40% 50% 50% 60%',
            transform: 'rotate(180deg) scale(1.05)',
          },
          '75%': {
            borderRadius: '50% 40% 30% 60% / 60% 40% 60% 40%',
          },
        },
        wobble: {
          '0%, 100%': { transform: 'translateX(0) rotate(0deg)' },
          '15%': { transform: 'translateX(-5px) rotate(-2deg)' },
          '30%': { transform: 'translateX(4px) rotate(1deg)' },
          '45%': { transform: 'translateX(-3px) rotate(-1deg)' },
          '60%': { transform: 'translateX(2px) rotate(0.5deg)' },
          '75%': { transform: 'translateX(-1px) rotate(-0.5deg)' },
        },
        ripple: {
          '0%': { transform: 'scale(1)', opacity: '1' },
          '100%': { transform: 'scale(2)', opacity: '0' },
        },
        shine: {
          '0%': { left: '-100%', opacity: '0' },
          '50%': { opacity: '0.5' },
          '100%': { left: '100%', opacity: '0' },
        },
        glassShimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
      backgroundImage: {
        'grid-pattern': `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%233B82F6' fill-opacity='0.03'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        'gradient-radial': 'radial-gradient(ellipse at center, var(--tw-gradient-stops))',
        'accent-gradient': 'linear-gradient(135deg, #3B82F6 0%, #06B6D4 100%)',
      },
      boxShadow: {
        'glow-blue': '0 0 20px rgba(59, 130, 246, 0.5)',
        'glow-cyan': '0 0 30px rgba(6, 182, 212, 0.3)',
        'card': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        'card-hover': '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
        // Liquid glass shadows
        'glass': '0 8px 32px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
        'glass-lg': '0 16px 48px rgba(0, 0, 0, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.3)',
        'glass-glow': '0 8px 32px rgba(59, 130, 246, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
        'liquid': '0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(255, 255, 255, 0.1)',
      },
      backdropBlur: {
        'glass': '16px',
        'glass-lg': '24px',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
