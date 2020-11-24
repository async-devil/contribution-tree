interface Data {
  [key: string]: any;
}

//! Please use colors in the same format
const themes: Data = {
  default: {
    colorLine: '#7a7a7a',
    colorBackground: {
      gradient: null,
      singleColor: '#ffffff',
    },
    colorPoints: '#000000',
    colorGraph: {
      gradient: null,
      singleColor: '#3aa25b',
    },
  },
  greenGradient: {
    colorLine: '#7a7a7a',
    colorBackground: {
      gradient: null,
      singleColor: '#ffffff',
    },
    colorPoints: '#000000',
    colorGraph: {
      gradient: {
        color1: '#8ed7a5', // 0%
        color2: '#63c783', // 25%
        color3: '#3aa25b', // 50%
        color4: '#30854b', // 75%
        color5: '#26683b', // 100%
      },
      singleColor: null,
    },
  },
  sakuraGradient: {
    colorLine: '#7a7a7a',
    colorBackground: {
      gradient: null,
      singleColor: '#ffffff',
    },
    colorPoints: '#000000',
    colorGraph: {
      gradient: {
        color1: '#e5afc4', // 0%
        color2: '#d782a3', // 25%
        color3: '#cd648d', // 50%
        color4: '#c44677', // 75%
        color5: '#9d325c', // 100%
      },
      singleColor: null,
    },
  },
  blueGradient: {
    colorLine: '#7a7a7a',
    colorBackground: {
      gradient: null,
      singleColor: '#ffffff',
    },
    colorPoints: '#000000',
    colorGraph: {
      gradient: {
        color1: '#66b5cb', // 0%
        color2: '#3e9db8', // 25%
        color3: '#34849b', // 50%
        color4: '#2a6b7e', // 75%
        color5: '#205261', // 100%
      },
      singleColor: null,
    },
  },
};

export { themes as default };
