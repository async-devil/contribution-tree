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

interface gradientToSVGOutput {
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

  public isGradient(input: string): isGradientOutput {
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

  public degreesToSVGXY(deg: string): string {
    //^ Cutting % and transforming string to integer
    let degInt = parseInt(deg.replace('%', ''));

    //^ Transforms 1 to 45 etc
    const degreesToStandart = (deg: number) => {
      if (deg === 360) return 0;
      for (let index = 0; index != 360; index += 45) {
        if (deg > index && deg <= index + 45) return index + 45;
      }
      return deg;
    };
    degInt = degreesToStandart(degInt);

    //^ Declaring x and y parametrs composer
    const fill = (x1: number, y1: number, x2: number, y2: number) => {
      return `x1="${x1}%" y1="${y1}%" x2="${x2}%" y2="${y2}%"`;
    };

    //^ Returning coords depending on the degrees
    //TODO: make it less lame, make algorithm or smth
    if (degInt === 0) return fill(0, 100, 0, 0);
    if (degInt === 45) return fill(0, 100, 100, 0);
    if (degInt === 90) return fill(0, 0, 100, 0);
    if (degInt === 135) return fill(0, 0, 100, 100);
    if (degInt === 180) return fill(0, 0, 0, 100);
    if (degInt === 225) return fill(100, 0, 0, 100);
    if (degInt === 270) return fill(100, 0, 0, 0);
    if (degInt === 315) return fill(100, 100, 0, 0);

    return fill(0, 100, 0, 0);
  }

  public regexCut(input: string): regexCutOutput {
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

  public construct(): gradientToSVGOutput {
    //^ Declaring input as parsed info
    const input = this.regexCut(this.info);

    //^ If regexCut returns error than returns error
    if (typeof input.error === 'string') {
      const output: gradientToSVGOutput = { error: input.error };
      return output;
    }

    const result = input.result;

    //^ Declaring SVG stops parameter
    const SVGStop = (percent: string, color: string) => {
      return `<stop offset="${percent}" stop-color="${color}"/>`;
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
    const cssOutput = (id: string) => {
      const cssId = id.replace(/(^id=)|(")/gm, '');
      return `fill: url(#${cssId})`;
    };

    //^ Declaring SVG stops array
    let buffer: string[] = [];
    //^ Necessary check
    if (result !== undefined) {
      for (let i = 0; i < result.points.length; i += 1) {
        buffer.push(SVGStop(result.points[i][1], result.points[i][0]));
      }
    } else {
      const output: gradientToSVGOutput = {
        error: 'result is undefined',
      };
      return output;
    }
    const SVGStops = buffer.join('\n');

    const output: gradientToSVGOutput = {
      result: {
        html: htmlOutput(result.id, this.degreesToSVGXY(result.degrees), SVGStops),
        css: cssOutput(result.id),
      },
    };

    return output;
  }
}

export { GradientToSVGFormat as default };
