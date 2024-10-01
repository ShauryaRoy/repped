/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        scroll: {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(-100%)' },
        }
      },
      colors: {
        'repped-purple': '#7c3aed'
      },
      fontFamily: {
        convergence: ['Convergence', 'sans-serif'],
      },
      animation: {
        scroll: 'scroll 20s linear infinite'
      }
    },
  },
  plugins: [],
}