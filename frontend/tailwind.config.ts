import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/**/*.{html,ts}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Dark Mode Colors
        'luxelle-dark': {
          bg: '#0F0F0F',
          card: '#1F1F1F',
          accent: '#E8B4BC',
          gold: '#D4AF37',
          highlight: '#F8C1D4',
          text: '#FFFFFF',
          'text-secondary': '#F5F0EB',
          'text-tertiary': '#CCCCCC',
        },
        // Light Mode Colors
        'luxelle-light': {
          bg: '#FAF8F5',
          card: '#FFFFFF',
          accent: '#E8B4BC',
          gold: '#D4AF37',
          highlight: '#F8C1D4',
          text: '#1F1F1F',
          'text-secondary': '#4A4A4A',
          'text-tertiary': '#999999',
        },
        // Semantic colors
        'rose-gold': '#E8B4BC',
        'warm-gold': '#D4AF37',
        'blush-pink': '#F8C1D4',
      },
      backgroundColor: {
        'luxelle': 'var(--bg-primary)',
        'luxelle-card': 'var(--bg-secondary)',
      },
      textColor: {
        'luxelle': 'var(--text-primary)',
        'luxelle-secondary': 'var(--text-secondary)',
        'luxelle-tertiary': 'var(--text-tertiary)',
      },
      boxShadow: {
        'luxelle-glow': '0 0 20px rgba(232, 180, 188, 0.3)',
        'luxelle-glow-gold': '0 0 20px rgba(212, 175, 55, 0.2)',
        'glass': '0 8px 32px rgba(31, 31, 31, 0.1)',
      },
      backdropBlur: {
        'xs': '2px',
      },
      animation: {
        'fade-in-up': 'fadeInUp 0.6s ease-out',
        'fade-in': 'fadeIn 0.4s ease-out',
        'slide-in-left': 'slideInLeft 0.5s ease-out',
        'slide-in-right': 'slideInRight 0.5s ease-out',
        'scale-in': 'scaleIn 0.4s ease-out',
        'shimmer': 'shimmer 1.5s infinite',
        'glow-pulse': 'glowPulse 2s infinite',
      },
      keyframes: {
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideInLeft: {
          '0%': { opacity: '0', transform: 'translateX(-20px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        slideInRight: {
          '0%': { opacity: '0', transform: 'translateX(20px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.9)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-1000px 0' },
          '100%': { backgroundPosition: '1000px 0' },
        },
        glowPulse: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(232, 180, 188, 0.3)' },
          '50%': { boxShadow: '0 0 30px rgba(232, 180, 188, 0.5)' },
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};

export default config;
