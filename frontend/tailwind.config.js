/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'box2-gradient': 'linear-gradient(95deg, rgba(111,103,223,1) 0%, rgba(131,151,250,1) 99%, rgba(69,84,252,1) 100%);',
        'box3-gradient': 'linear-gradient(167deg, rgba(147,141,244,1) 0%, rgba(118,113,232,1) 50%, rgba(123,141,223,1) 85%, rgba(142,150,255,1) 100%);',
        'box4-gradient': 'linear-gradient(167deg, rgba(181,176,255,1) 0%, rgba(164,161,249,1) 50%, rgba(153,167,231,1) 85%, rgba(156,161,221,1) 100%)',
      },
    },
  },
  fontFamily: {
    sans: ['Roboto', 'sans-serif'],
  },
  plugins: [],
}




