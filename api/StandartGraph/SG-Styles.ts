import { themes, Theme } from '../../themes/SG-themes';

class Styles {
  public choice: string;

  constructor(choice: string) {
    this.choice = choice;
  }
}

interface isGradientOutput {
  result: boolean;
  error?: string;
}

interface regexCutOutput {
  error?: string;
  result?: {
    degrees: string;
    id: string;
    points: Array<Array<string>>;
  };
}

interface gradientToSVGConstructOutput {
  error?: string;
  result?: {
    html: string;
    css: string;
  };
}

class GradientToSVGFormat {
  readonly info;

  constructor(info: string) {
    this.info = info;
  }

  public isGradient(input: string) {
    //^ If input contains rgb(...), returns false
    if (input.search(/rgb\(.*?\)/gm) !== -1) {
      const output: isGradientOutput = { result: false, error: 'Invalid color' };
      return output;
    }

    //^ Getting gradient information in [deg, id, stops] format
    let gradientDataArray = input.replace(/(^l.*?\()|(\)$)/gm, '').split(',');

    //^ If nothing found returns false
    if (gradientDataArray.length === 0) {
      const output: isGradientOutput = { result: false, error: 'Invalid gradient data' };
      return output;
    }

    //^ If number of arguments less than 3 returns false
    if (gradientDataArray.length < 3) {
      const output: isGradientOutput = { result: false, error: 'Invalid gradient data' };
      return output;
    }

    //^ Deleting first space if they are exist
    for (let i = 0; i < gradientDataArray.length; i += 1) {
      gradientDataArray[i] = gradientDataArray[i].replace(/^ /gm, '');
    }

    //^ If number with deg not found then returns false
    if (gradientDataArray[0].search(/^\d{0,3}deg$/gm) === -1) {
      const output: isGradientOutput = { result: false, error: 'Invalid degrees' };
      return output;
    }

    //^ If id not found returns false
    if (gradientDataArray[1].search(/^id=".*"$/gm) === -1) {
      const output: isGradientOutput = { result: false, error: 'Invalid ID' };
      return output;
    }

    //^ Getting color and percentage into an array in array
    let gradientStopsInfo: Array<Array<string>> = [];
    for (let i = 0; i < gradientDataArray.length - 2; i += 1) {
      gradientStopsInfo[i] = gradientDataArray[i + 2].split(' ');
    }

    //^ Grabbing each of stop point properties
    for (let i = 0; i < gradientStopsInfo.length; i += 1) {
      //^ Checking if color is a hex, if not returns false
      if (gradientStopsInfo[i][0].search(/(^#[0-9a-fA-F]{3}$)|(^#[0-9a-fA-F]{6}$)/gm) === -1) {
        const output: isGradientOutput = { result: false, error: 'Invalid color' };
        return output;
      }

      //^ checking if percentage valid, if not returns false
      if (gradientStopsInfo[i][1].search(/^\d*%$/gm) === -1) {
        const output: isGradientOutput = { result: false, error: 'Invalid percentage' };
        return output;
      }
    }

    const output: isGradientOutput = { result: true };
    return output;
  }

  public regexCut(input: string) {
    //^ Checking if input is a valid gradient
    const isGradient = this.isGradient(input);
    if (isGradient.result === false) {
      //^ If not returns error description
      let output: regexCutOutput = { error: isGradient.error };
      return output;
    }

    //^ Slicing up input
    let cuttedAndSlicedInput = input.replace(/(^l.*?\()|(\)$)/gm, '').split(',');
    for (let i = 0; i < cuttedAndSlicedInput.length; i += 1) {
      cuttedAndSlicedInput[i] = cuttedAndSlicedInput[i].replace(/^ /gm, '');
    }

    //^ Getting points
    let inputPoints: Array<Array<string>> = [];
    for (let i = 0; i < cuttedAndSlicedInput.length - 2; i += 1) {
      inputPoints[i] = cuttedAndSlicedInput[i + 2].split(' ');
    }

    //^ Composing output
    const output: regexCutOutput = {
      result: {
        degrees: cuttedAndSlicedInput[0],
        id: cuttedAndSlicedInput[1],
        points: inputPoints,
      },
    };
    return output;
  }

  public construct() {
    //^ Declaring input as parsed info
    const input = this.regexCut(this.info);

    //^ If regexCut returns error than returns error
    if (typeof input.error === 'string') {
      return { error: 'Invalid gradient' };
    }

    //^ Declaring SVG stops parameter
    const SVGStop = (percent: string, color: string) => {
      return `
         <stop offset="${percent}" stop-color="${color}"/>
      `;
    };

    //^ Declaring html output composer
    const htmlOutput = (id: string, XY: string, SVGStops: string) => {
      return `
      <linearGradient ${id} ${XY}>
      ${SVGStops}
      </linearGradient>
      `;
    };

    //^ Declaring css output composer
    const cssOutput = (id:string) => {
      const cssId = id.replace(/(^id=)|(")/gm, '');
      return `
      fill: url(#${cssId})
      `;
    };

    let SVGStops:string[] = []
    for(let i = 0; i< input.result.points.length) //TODO: fix input.result undefined bug
  }
}

export { Styles, GradientToSVGFormat };
