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

/**
 * Output of {@link gradientToSVG} method
 * @alias gradientToSVGOutput
 */
type gradientToSVGOutput = {
  /** HTML code of SVG gradient */
  html: string;
  /** CSS code of SVG gradient */
  css: string;
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

  /*------------------------------------------------------------------------------------------*/

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
      if (
        gradientStopsInfo[i][0].search(
          /(^#[0-9a-fA-F]{3}$)|(^#[0-9a-fA-F]{6}$)|(^#[0-9a-fA-F]{4}$)|(^#[0-9a-fA-F]{8}$)/gm,
        ) === -1
      ) {
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

  /*------------------------------------------------------------------------------------------*/

  /*------------------------------------------------------------------------------------------*/

  /**
   * Reversed method, transforms SVG-like gradient to CSS
   * @param {regexCutOutput} data Parsed gradient in result object
   * @returns {string} CSS-like gradient
   */
  public parsedGradientInfoToCSS(data: regexCutOutput): string {
    const deg = data.degrees;

    let buffer: string[] = [];

    //^ Getting all points as a string
    for (let i = 0; i < data.points.length; i += 1) {
      buffer.push(`${data.points[i][0]} ${data.points[i][1]}`);
    }

    const points = buffer.join(', ');
    return `linear-gradient(${deg}, ${points})`;
  }

  /*------------------------------------------------------------------------------------------*/

  /*------------------------------------------------------------------------------------------*/

  /**
   * Transform degrees into SVG XY, but returns only parsed degrees like: 0, 45, 90, 135 etc. (n+45)
   * @param {string} deg Degrees in format like: 50deg
   * @returns {string} XY values in format like: x1="100%" y1="0%" x2="100%" y2="0%"
   */
  public degreesToSVGXY(deg: string): string {
    //^ Cutting % and transforming string to integer
    let degInt = parseInt(deg.replace('%', ''));

    //^ Declaring x and y parametrs composer
    const fill = (x1: number, y1: number, x2: number, y2: number) => {
      return `x1="${x1}%" y1="${y1}%" x2="${x2}%" y2="${y2}%"`;
    };

    //^ Returning coords depending on the degrees

    function calculateDegrees(
      degArr: number[],
      changeIndex: number,
      inPositive: boolean,
      deg: number,
      highestDeg: number,
    ): string {
      degArr[changeIndex] = inPositive
        ? Math.floor(100 - (highestDeg - deg) * 2.2) //? 100/45=2.2
        : Math.floor((highestDeg - deg) * 2.2);

      return fill(degArr[0], degArr[1], degArr[2], degArr[3]);
    }

    if (degInt >= 0 && degInt < 45) return calculateDegrees([0, 100, 0, 0], 2, true, degInt, 45);
    if (degInt >= 45 && degInt < 90) return calculateDegrees([0, 100, 100, 0], 1, false, degInt, 90);
    if (degInt >= 90 && degInt < 135) return calculateDegrees([0, 0, 100, 0], 3, true, degInt, 135);
    if (degInt >= 135 && degInt < 180) return calculateDegrees([0, 0, 100, 100], 2, false, degInt, 180);
    if (degInt >= 180 && degInt < 225) return calculateDegrees([0, 0, 0, 100], 0, true, degInt, 225);
    if (degInt >= 225 && degInt < 270) return calculateDegrees([100, 0, 0, 100], 3, false, degInt, 270);
    if (degInt >= 270 && degInt < 315) return calculateDegrees([100, 0, 0, 0], 1, true, degInt, 315);
    if (degInt >= 315 && degInt < 360) return calculateDegrees([100, 100, 0, 0], 0, false, degInt, 360);

    return fill(0, 100, 0, 0);
  }

  /*------------------------------------------------------------------------------------------*/

  /*------------------------------------------------------------------------------------------*/

  /**
   * Transforms CSS-like gradient into parsed gradient info
   * @param {string} input CSS-like gradient
   * @returns {regexCutOutput | Error} {@link regexCutOutput}
   */
  public regexCut(input: string): regexCutOutput {
    //^ Checking if input is a valid gradient
    const isGradient = this.isGradient(input);
    if (isGradient.result === false) {
      //^ If not throws error description
      throw new Error(isGradient.error);
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
      degrees: cuttedAndSlicedInput[0],
      id: cuttedAndSlicedInput[1],
      points: inputPoints,
    };
    return output;
  }

  /*------------------------------------------------------------------------------------------*/

  /*------------------------------------------------------------------------------------------*/

  /**
   * Packs parsed info from {@link regexCutOutput} into object
   * @returns {gradientToSVGOutput | Error} {@link gradientToSVGOutput}
   */
  public construct(): gradientToSVGOutput {
    //^ Declaring input as parsed info
    const regexcut = this.regexCut(this.info);

    //^ Declaring SVG stops parameter
    const SVGStop = (percent: string, color: string) => {
      return `<stop offset="${percent}" stop-color="${color}"/>`;
    };

    //^ Declaring html output composer
    const htmlOutput = (id: string, XY: string, SVGStops: string) => {
      return `<linearGradient ${id} ${XY}>\n${SVGStops}\n</linearGradient>`;
    };

    //^ Declaring css output composer
    const cssOutput = (id: string) => {
      const cssId = id.replace(/(^id=)|(")/gm, '');
      return `fill: url(#${cssId})`;
    };

    //^ Declaring SVG stops array
    let buffer: string[] = [];

    for (let i = 0; i < regexcut.points.length; i += 1) {
      buffer.push(SVGStop(regexcut.points[i][1], regexcut.points[i][0]));
    }

    const SVGStops = buffer.join('\n');

    const output: gradientToSVGOutput = {
      html: htmlOutput(regexcut.id, this.degreesToSVGXY(regexcut.degrees), SVGStops),
      css: cssOutput(regexcut.id),
    };

    return output;
  }

  /*------------------------------------------------------------------------------------------*/
}

export { GradientToSVGFormat as default };
