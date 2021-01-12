/**
 * Output of {@link isGradient} method
 * @alias isGradientOutput
 */
type isGradientOutput = {
  /** If gradient detected, result will be true, if not false*/
  result: boolean;
  /** Error message, exists only if gradient hasn`t detected*/
  error?: string;
};

/**
 * Output of {@link regexCut} method
 * @alias regexCutOutput
 */
type regexCutOutput = {
  /** Error message, exists only if gradient is invalid or something went wrong*/
  error?: string;
  /** Result, exist only if error hasn`t appeared*/
  result?: {
    /** Degrees in format like: 50deg*/
    degrees: string;
    /** Gradient ID in format like: id="Gradient"*/
    id: string;
    /** Array of points
     * @example [
            ['#e5afc4', '0%'],
            ['#d782a3', '25%'],
            ['#cd648d', '50%'],
            ['#c44677', '75%'],
            ['#9d325c', '100%'],
          ]
     */
    points: Array<Array<string>>;
  };
};

/**
 * Output of {@link gradientToSVG} method
 * @alias gradientToSVGOutput
 */
type gradientToSVGOutput = {
  /** Error message, exists only if gradient is invalid or something went wrong*/
  error?: string;
  /** Result, exist only if error hasn`t appeared*/
  result?: {
    /** HTML code of SVG gradient */
    html: string;
    /** CSS code of SVG gradient */
    css: string;
  };
};

/*

















*/

/**
 * Class which contains methods to analize and transform CSS-like gradients to SVG
 */
class GradientToSVGFormat {
  /**
   * @param {string} info CSS-like gradient
   */
  readonly info;

  constructor(info: string) {
    this.info = info;
  }

  /**
   * @param {string} input CSS-like gradient or random string
   * @returns {isGradientOutput} {@link isGradientOutput}
   */
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

  /**
   * Reversed method, transforms SVG-like gradient to CSS
   * @param {regexCutOutput} data Parsed gradient in result object
   * @returns {string} CSS-like gradient
   */
  public parcedGradientInfoToCSS(data: regexCutOutput): string {
    //^ Checking if nothing got wrong
    if (data.error !== undefined || data.result === undefined)
      //^ If incorrect data appears returns this
      return `linear-gradient(green, lightgreen)`;
    const deg = data.result.degrees;

    //^ Getting all points as a string
    let buffer: string[] = [];
    for (let i = 0; i < data.result.points.length; i += 1) {
      buffer.push(`${data.result.points[i][0]} ${data.result.points[i][1]}`);
    }
    const points = buffer.join(', ');

    return `linear-gradient(${deg}, ${points})`;
  }

  /**
   * Transform degrees into SVG XY, but returns only parced degrees like: 0, 45, 90, 135 etc. (n+45)
   * @param {string} deg Degrees in format like: 50deg
   * @returns {string} XY values in format like: x1="100%" y1="0%" x2="100%" y2="0%"
   */
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

  /**
   * Transforms CSS-like gradient into parced gradient info
   * @param {string} input CSS-like gradient
   * @returns {regexCutOutput} {@link regexCutOutput}
   */
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
  /**
   * Packs parced info from {@link regexCutOutput} into object
   * @returns {gradientToSVGOutput} {@link gradientToSVGOutput}
   */
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
