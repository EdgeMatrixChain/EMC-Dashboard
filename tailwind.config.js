/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  // darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        'GeneralSans-Medium': ['GeneralSans-Medium'],
        'GeneralSans-Semibold': ['GeneralSans-Semibold'],
      },
      backgroundImage: {
        iconHoverBg:
          'linear-gradient(61.09deg, #9844ED 0.16%, #533AE6 38.61%, #546CEA 67.14%, #7FC8FC 99.32%)',
      },
    },
    screens: {
      xs: { max: '520px' },
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px',
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
