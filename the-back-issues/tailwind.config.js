// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",     // if using app/ directory
    "./pages/**/*.{js,ts,jsx,tsx}",   // if using pages/ directory
    "./components/**/*.{js,ts,jsx,tsx}", // if using components/
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-rainbow': 'linear-gradient(270deg, #ff6ec4, #7873f5, #4ade80)',
      },
      backgroundSize: {
        '200': '200% 200%',
      },
      keyframes: {
        gradient: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
      },
      animation: {
        'gradient-bg': 'gradient 6s ease infinite',
      },
    },
  },
  plugins: [],
};