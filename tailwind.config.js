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
        day1: '#b45309',   // burnt amber (Alps descent)
        day2: '#15803d',   // forest green (Gesäuse)
        day3: '#0369a1',   // river blue (flat Donau)
        donau: '#1e40af',
        ink: '#1c1917',    // warm near-black
        paper: '#fdfaf3',  // warm cream
        moss: '#3f6212',
        rust: '#9a3412',
      },
      backgroundImage: {
        'hero-fallback': 'radial-gradient(1000px 500px at 20% 0%, rgba(180, 83, 9, 0.35), transparent 60%), radial-gradient(900px 500px at 90% 10%, rgba(21, 128, 61, 0.3), transparent 55%), linear-gradient(180deg, #0c0a09 0%, #1c1917 100%)',
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
