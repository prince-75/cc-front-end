/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: '#08348c',
        'primary-light': '#0a41b0',
        'primary-dark': '#062a73',
      }
    },
  },
  plugins: [],
} 