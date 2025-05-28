/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          light: '#4da6ff',
          DEFAULT: '#0078ff',
          dark: '#0057b8',
          background: 'var(--primary-background)',
          foreground: 'var(--primary-foreground)',
        },
        secondary: {
          light: '#f8f9fa',
          DEFAULT: '#e9ecef',
          dark: '#dee2e6',
          background: 'var(--secondary-background)',
          foreground: 'var(--secondary-foreground)',
        },
        accent: {
          DEFAULT: 'var(--accent-color)',
          foreground: 'var(--accent-foreground)',
          light: 'var(--accent-light)',
          dark: 'var(--accent-dark)',
        },
        border: {
          primary: 'var(--border-primary)',
          secondary: 'var(--border-secondary)',
          light: 'var(--border-light)',
          dark: 'var(--border-dark)',
        },
        gray: {
          900: '#111416',
          800: '#1a1d21',
          700: '#283038',
          600: '#374151',
          500: '#6b7280',
          400: '#9baaba',
          300: '#d1d5db',
          200: '#e5e7eb',
          100: '#f3f4f6',
        },
        blue: {
          600: '#0c77f2',
          700: '#0a5bb8',
        }
      },
      fontFamily: {
        sans: ['Spline Sans', 'sans-serif'],
      },
    },
  },
  plugins: [],
};