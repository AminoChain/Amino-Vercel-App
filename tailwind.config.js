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
        donatebuttonIntroShadow: '12px 10px 16px rgba(52, 221, 152, 0.4)',
        marketplaceButtonShadow1: '12px 10px 16px rgba(64, 237, 237, 0.4)',
        searchButtonShadow: '9px 9px 16px rgba(64, 237, 237, 0.4)',
        nftCard: '4px 4px 10px rgba(127, 255, 207, 0.4)',
      },
      boxShadow: {
        'nft': '9px 9px 16px rgba(254, 199, 255, 1)',
      },
      fontFamily: {
        satoshiRegular: ['Satoshi-Regular'],
        satoshiBold: ['Satoshi-Bold'],
        satoshiLight: ['Satoshi-Light'],
        satoshiVariable: ['Satoshi-Variable'],
        satoshiMedium: ['Satoshi-Medium'],
        satoshiBlack: ['Satoshi-Black'],
        satoshiItalic: ['Satoshi-Italic'],
        satoshiBlackItalic: ['Satoshi-BlackItalic'],
        satoshiVariableItalic: ['Satoshi-VariableItalic'],
        satoshiLightItalic: ['Satoshi-LightItalic'],
        satoshiMediumItalic: ['Satoshi-MediumItalic'],
        satoshiBoldItalic: ['Satoshi-BoldItalic'],
      },
    },
  },
  plugins: [],
}
