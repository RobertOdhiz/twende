/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    screens: {
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
    },

    fontFamily: {
      display: ['Quicksand', 'sans-serif'],
      body: ['Quicksand', 'sans-serif'],
    },
    colors: {
      transparent: 'transparent',
      mint: '#003135',
      Lightmint : '#024950',
      brown : '#964734',
      skyblue: '#AFDDE5',
      cyan: '0FA4AF',
      white: '#FFFFFF',
      black: '#000000',
    },

    extend: {},
  },
  plugins: [],
}
