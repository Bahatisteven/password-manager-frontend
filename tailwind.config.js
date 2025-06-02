/** @type {import('tailwindcss').Config} */
const tailwindConfig = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Password Manager Default Theme
        'bw-primary': 'var(--color-primary)',
        'bw-secondary': 'var(--color-secondary)',
        'bw-accent': 'var(--color-accent)',
        'bw-bg': 'var(--color-bg)',
        'bw-surface': 'var(--color-surface)',
        'bw-text': 'var(--color-text)',
        'bw-text-secondary': 'var(--color-text-secondary)',
        'bw-border': 'var(--color-border)',
        'bw-hover': 'var(--color-hover)',
      },
      animation: {
        'slide-up': 'slideUp 0.3s ease-out',
        'fade-in': 'fadeIn 0.2s ease-out',
        'ripple': 'ripple 0.6s linear',
        'skeleton': 'skeleton 1.5s ease-in-out infinite alternate',
      },
      keyframes: {
        slideUp: {
          '0%': { transform: 'translateY(100%)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        ripple: {
          '0%': { transform: 'scale(0)', opacity: '1' },
          '100%': { transform: 'scale(4)', opacity: '0' },
        },
        skeleton: {
          '0%': { backgroundColor: 'hsl(200, 20%, 80%)' },
          '100%': { backgroundColor: 'hsl(200, 20%, 95%)' },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
};

module.exports = tailwindConfig;