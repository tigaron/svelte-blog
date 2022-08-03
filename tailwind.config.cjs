const colors = require('tailwindcss/colors');

const config = {
  content: ["./src/**/*.{html,js,svelte,ts}"],

  theme: {
    extend: {
        colors: {
          primary: colors.orange,
      }
    },
  },

  darkMode: 'class',

  corePlugins: {
    aspectRatio: false,
  },

  plugins: [
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/typography'),
  ],
};

module.exports = config;
