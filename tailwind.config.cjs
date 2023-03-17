/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    'node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}',
    "./node_modules/react-tailwindcss-datepicker/dist/index.esm.js"
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'gray1': '#f9fafb',
        'blackxd': '#000',
        'blue1': '#33EDFF',
        'magenta1': '#FF0080',
      },
    }
  },
  plugins: [
    require('flowbite/plugin')
  ]
}
