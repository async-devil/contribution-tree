interface Data {
	[ key: string ]: any; 
}

//! Please use colors in the same format
const colorsSchemes:Data = {
  default: {
    colorErr: '#000000',
    colorBg: '#ebedf0',
    colorL1: '#9be9a8',
    colorL2: '#40c463',
    colorL3: '#30a14e',
    colorL4: '#216e39',
  },
  sakura: {
    colorErr: '#000000',
    colorBg: '#e5afc4',
    colorL1: '#d782a3',
    colorL2: '#cd648d',
    colorL3: '#c44677',
    colorL4: '#9d325c',
  },
};

export { colorsSchemes as default };
