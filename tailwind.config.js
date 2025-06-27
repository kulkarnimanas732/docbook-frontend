/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./public/index.html",      // ✅ if you are using plain React
    "./src/**/*.{js,jsx,ts,tsx}" // ✅ match all JS/JSX files in src
  ],
  theme: {
   extend: {
  animation: {
    dropdown: 'fadeInScale 0.3s ease-out',
  },
  keyframes: {
    fadeInScale: {
      '0%': { opacity: 0, transform: 'scale(0.95)' },
      '100%': { opacity: 1, transform: 'scale(1)' },
    },
  },
}

  },
  plugins: [],
};
