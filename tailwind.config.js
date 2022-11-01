/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    colors: {
      "black": "#626262",
      "primary": "#5CF1B9",
      "experiment": "#40EDED",
      "main": "#8F95B2",
      "pinkHLAA": "#FEC7FF",
      "orangeHLAB": "#FFDEB7",
      "blueHLAC": "#82FFFF",
      "greenHLADRB": "#7FFFCF",
      "yellowHLADPB": "#FFE8A3",
      "white": "#FAFAFA",
      "purpleHLADQA": "#897FFF"
    },
    extend: {},
  },
  plugins: [],
}