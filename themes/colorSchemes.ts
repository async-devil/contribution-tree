type Data = {
  [key: string]: any;
};

//! Please use colors in the same format
const colorsSchemes: Data = {
  default: {
    colorErr: '#000000',
    colorBg: '#8ed7a5',
    colorL1: '#63c783',
    colorL2: '#3aa25b',
    colorL3: '#30854b',
    colorL4: '#26683b',
  },
  sakura: {
    colorErr: '#000000',
    colorBg: '#e5afc4',
    colorL1: '#d782a3',
    colorL2: '#cd648d',
    colorL3: '#c44677',
    colorL4: '#9d325c',
  },
  blue: {
    colorErr: '#000000',
    colorBg: '#66b5cb',
    colorL1: '#3e9db8',
    colorL2: '#34849b',
    colorL3: '#2a6b7e',
    colorL4: '#205261',
  },
};

export { colorsSchemes as default };
