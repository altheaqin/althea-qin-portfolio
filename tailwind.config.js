/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#14110f',
        fog: '#f3efe7',
        rust: '#965b45',
        moss: '#617a63',
        sand: '#c9b79c',
      },
      fontFamily: {
        sans: ['"Helvetica Neue"', 'Arial', 'sans-serif'],
        serif: ['"Iowan Old Style"', '"Times New Roman"', 'serif'],
      },
      boxShadow: {
        panel: '0 20px 60px rgba(20, 17, 15, 0.08)',
      },
      backgroundImage: {
        'paper-grid':
          'linear-gradient(rgba(20,17,15,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(20,17,15,0.06) 1px, transparent 1px)',
      },
    },
  },
  plugins: [],
};
