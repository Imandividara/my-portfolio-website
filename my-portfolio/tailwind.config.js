/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme');
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy:        '#191e29', // Deep navy / dark gunmetal
        dark_blue:   '#132d46', // Very dark blue
        teal:        '#01c38d', // Vibrant teal / cyan-lime
        nickel:      '#696e79', // Muted grayish blue / nickel
        pure_white:  '#ffffff', // Pure white
      },
      fontFamily: {
        poppins: ['Poppins', ...defaultTheme.fontFamily.sans],
      },
       scrollBehavior: ['responsive'],
    },
  },
  plugins: [],
}



