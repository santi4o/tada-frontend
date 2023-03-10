/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'blue1': '#33EDFF',
        'magenta1': '#FF0080'
      },
    }
  },
  plugins: [],
}
