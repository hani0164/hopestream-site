/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#26547C',
        secondary: '#EF476F',
        accent: '#FFD166',
        neutral: '#06D6A0'
      }
    },
  },
  plugins: [],
};
