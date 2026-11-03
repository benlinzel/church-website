/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        // Site fonts (variables set in utils/fonts.ts)
        sans: ['var(--font-body)', ...defaultTheme.fontFamily.sans],
        display: ['var(--font-display)', ...defaultTheme.fontFamily.sans],
        // Evening in Bethlehem serif (components/eib/fonts.ts)
        eibSerif: ['var(--font-eib-serif)', ...defaultTheme.fontFamily.serif],
      },
    },
  },
  plugins: [],
};
