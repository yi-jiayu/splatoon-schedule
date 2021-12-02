module.exports = {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      gridTemplateColumns: {
        schedule: 'auto 1fr 1fr 1fr 1fr'
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
