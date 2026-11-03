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
      // a glow that ripples out from an element's border, in the colour set
      // by --pulse (the Sunday prompt's "starting soon" and "live" states)
      keyframes: {
        'border-pulse': {
          '0%': { boxShadow: '0 0 0 0 var(--pulse)' },
          '70%, 100%': { boxShadow: '0 0 0 10px transparent' },
        },
      },
      animation: {
        'border-pulse': 'border-pulse 2s ease-out infinite',
      },
    },
  },
  plugins: [],
};
