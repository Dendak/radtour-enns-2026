/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Inter"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        display: ['"Plus Jakarta Sans"', '"Inter"', 'sans-serif'],
      },
      colors: {
        day1: '#e11d48',
        day2: '#f97316',
        day3: '#14b8a6',
        donau: '#1d4ed8',
        ink: '#0f172a',
        paper: '#fbfaf6',
      },
      backgroundImage: {
        'hero-grad': 'radial-gradient(1200px 600px at 10% -20%, rgba(20,184,166,0.18), transparent 60%), radial-gradient(900px 500px at 90% 0%, rgba(249,115,22,0.16), transparent 55%), linear-gradient(180deg, #0b1220 0%, #0f172a 100%)',
      },
      boxShadow: {
        soft: '0 1px 3px rgba(15,23,42,0.06), 0 8px 24px -8px rgba(15,23,42,0.08)',
      },
      animation: {
        'fade-up': 'fadeUp .6s ease-out both',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: 0, transform: 'translateY(8px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
};
