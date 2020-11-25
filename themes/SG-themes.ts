interface Data {
  [key: string]: Theme;
}

//! Please use colors in the same format
interface Theme {
  background: string;
  line: string;
  graph: string;
  points: string;
}

const themes: Data = {
  default: {
    line: '#7a7a7a',
    background: '#ffffff',
    points: '#000000',
    graph: '#3aa25b',
  },
  greenGradient: {
    line: '#7a7a7a',
    background: '#ffffff',
    points: '#000000',
    graph: 'linear-gradient(0deg, #8ed7a5 0%, #63c783 25%, #3aa25b 50%, #30854b 75%, #26683b 100%)',
  },
  sakuraGradient: {
    line: '#7a7a7a',
    background: '#ffffff',
    points: '#000000',
    graph: 'linear-gradient(0deg, #e5afc4 0%, #d782a3 25%, #cd648d 50%, #c44677 75%, #9d325c 100%)',
  },
  blueGradient: {
    line: '#7a7a7a',
    background: '#ffffff',
    points: '#000000',
    graph: 'linear-gradient(0deg, #66b5cb 0%, #3e9db8 25%, #34849b 50%, #2a6b7e 75%, #205261 100%)',
  },
};

export { themes, Theme };
