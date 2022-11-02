/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        black: '#626262',
        primary: '#5CF1B9',
        experiment: '#40EDED',
        main: '#8F95B2',
        pinkHLAA: '#FEC7FF',
        orangeHLAB: '#FFDEB7',
        blueHLAC: '#82FFFF',
        greenHLADRB: '#7FFFCF',
        yellowHLADPB: '#FFE8A3',
        white: '#FAFAFA',
        purpleHLADQA: '#897FFF',
        gradientDonateStart: '#A9FFDC',
        gradientDonateEnd: '#16FFA1',
        marketplaceButton: '#ECF1F4',
      },
      dropShadow: {
        donatebuttonIntroShadow: [
          '9px 9px 16px rgba(52, 221, 152, 0.24)',
          '-9px -9px 16px rgba(250, 251, 255, 1)',
        ],
        marketplaceButtonShadow: [
          '9px 9px 16px rgba(64, 237, 237, 0.4)',
          '-9px -9px 16px rgba(250, 251, 255, 1)',
        ],
      },
    },
  },
  plugins: [],
}
