/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}', './styles/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'sand':'#f9efe4'
      }
    },
  },
  plugins: [require('tailwind-scrollbar'), ({ nocompatible: true })],
};
