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
        orangeHLAB: '#FFC077',
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
        donatebuttonIntroShadow: '9px 9px 16px rgba(52, 221, 152, 0.24)',
        marketplaceButtonShadow: '9px 9px 16px rgba(64, 237, 237, 0.4)',
        searchButtonShadow: '9px 9px 16px rgba(64, 237, 237, 0.4)',
        nftCard: '4px 5px 10px rgba(180, 180, 180, 1)',
      },
      fontFamily: {
        satoshi: ["satoshi"],
      },
    },
  },
  plugins: [],
}
