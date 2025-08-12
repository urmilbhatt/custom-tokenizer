/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
    extend: {
      colors: {
        'pastel-blue': '#E0F2FE',
        'pastel-green': '#DCFCE7',
        'pastel-purple': '#F3E8FF',
        'pastel-pink': '#FCE7F3',
        'pastel-yellow': '#FEF3C7',
        'pastel-orange': '#FFEDD5',
        'pastel-red': '#FEE2E2',
        'pastel-indigo': '#E0E7FF',
      }
    },
  },
  plugins: [],
}
