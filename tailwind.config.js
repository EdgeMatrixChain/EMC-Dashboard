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
