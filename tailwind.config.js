module.exports = {
  purge: [],
  darkMode: false,
  theme: {
    extend: {
      gridTemplateColumns: {
        table: '150px auto',
      },
      colors: {
        dullGreen: {
          100: '#f0f5ec',
          200: '#edf4e9',
          300: '#e9f1e4',
          400: '#d2d9cd',
          500: '#bac1b6',
          600: '#a3a9a0',
          700: '#8c9189',
          800: '#757972',
          900: '#5d605b',
        },
        lightGreen: {
          100: '#f5f9ea',
          200: '#ebf4d5',
          300: '#e2eec1',
          400: '#d8e9ac',
          500: '#cee397',
          600: '#a5b679',
          700: '#7c885b',
          800: '#525b3c',
          900: '#292d1e',
        },
        orange: {
          100: '#ffedd6',
          200: '#ffdbac',
          300: '#ffca83',
          400: '#ffb859',
          500: '#ffa630',
          600: '#cc8526',
          700: '#99641d',
          800: '#664213',
          900: '#33210a',
        },
        gray: {
          100: '#ffffff',
          200: '#e7e7e7',
          300: '#cecece',
          400: '#b6b6b6',
          500: '#9d9d9d',
          600: '#858585',
          700: '#6a6a6a',
          800: '#353535',
          900: '#0A0A0A',
        },
        blue: {
          100: '#cce4f6',
          200: '#99c9ed',
          300: '#66afe5',
          400: '#3394dc',
          500: '#0079d3',
          600: '#0061a9',
          700: '#00497f',
          800: '#003054',
          900: '#00182a',
        },
        gradientGreen: {
          100: '#E0EFB7',
          200: '#D8FF71',
          300: '#ADC66E',
        },
        background: {
          100: '#98A1B8', // table odd
          200: '#696E80', // table even
          300: '#5C637D', // circular home page gradient end
          400: '#3D4459', // main page BG top & row right
          500: '#626A83', // main page BG bottom & row left
          600: '#5B627C', // top left stat box
          700: '#3C4255', // bottom right stat box
          800: '#AEB5C7', //odd faded
          900: '#898D9B', //even faded
          1000: '#363B4D',
          1100: '#3D455E',
          1200: '#2c3245',
        },
        red: {
          100: '#FF4753',
          200: '#DA3943',
          300: '#F26A72',
        },
      },
      spacing: {
        70: '17.5rem',
        160: '40rem',
      },
      container: false,
    },
  },
  variants: {
    extend: {
      opacity: ['disabled'],
    },
  },
  plugins: [
    function ({ addComponents }) {
      addComponents({
        '.container': {
          width: '100%',
          marginLeft: 'auto',
          marginRight: 'auto',
          '@screen sm': { maxWidth: '640px' },
          '@screen md': { maxWidth: '768px' },
          '@screen lg': { maxWidth: '768px' },
        },
      });
    },
  ],
};
