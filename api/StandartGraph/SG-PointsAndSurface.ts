import { Data, Info } from './SG-Data';

class Calc extends Data {
  /**
   * @param data Construction info about graph
   * @param pointsPercentage Percentage of each point location number of values must be number of rows + 1
   */
  constructor(protected data: Info, protected pointsPercentage: Array<number>) {
    super(data);
    if (pointsPercentage.length !== this.startYPoints(data.rows).length) {
      // throw new Error('Invalid number of points');
      console.log('tt');
    }
  }

  /**
   * Getter which returns points coordinates
   * @returns {Array<Array<number>>} Array of arrays with coordinates
   */
  public get getResult(): Array<Array<number>> {
    return this.calculate();
  }

  private calculate(): Array<Array<number>> {
    const sYp = this.startYPoints(this.data.rows);
    const sXp = this.startXPoints(this.data.columns).reverse();

    let buffer: Array<Array<number>> = [];
    for (let i = 0; i < sYp.length; i += 1) {
      buffer.push([
        //^ From last x to first x
        sXp[i],
        //^ StartPointY[i] + insideHeight * percentage[i] / 100 = y coordinate of point
        sYp[0] + this.data.insideHeight * (this.pointsPercentage[i] / 100),
      ]);

      //^ If i is index of last sXp element
      if (i === sXp.length - 1) {
        break;
      }
    }

    return buffer;
  }
}

class Surface extends Calc {
  /**
   * @param data Construction info about graph
   * @param pointsPercentage Percentage of each point location number of values must be number of rows + 1
   */
  constructor(protected data: Info, protected pointsPercentage: Array<number>) {
    super(data, pointsPercentage);
  }

  /**
   * Getter which return string with surface
   * @returns {string} SVG surface
   */
  public get getSurface(): string {
    return this.parse();
  }

  private parse(): string {
    const points = this.getResult;
    const sYp = this.startYPoints(this.data.rows);

    const Lsvg = (x: number, y: number): string => {
      return `L ${x * this.data.factor} ${y * this.data.factor}`;
    };

    const Msvg = (x: number, y: number): string => {
      return `M ${x * this.data.factor} ${y * this.data.factor}`;
    };

    let buffer: Array<string> = [];

    //^ First X point and first Y start point + insideHeight
    buffer.push(Msvg(points[0][0], sYp[0] + this.data.insideHeight));

    for (let i = 0; i < points.length; i += 1) {
      //^ X of the point of index i and y
      buffer.push(Lsvg(points[i][0], points[i][1]));
    }

    //^ Last point X coordinate and the lowest Y
    buffer.push(Lsvg(points[points.length - 1][0], sYp[0] + this.data.insideHeight), 'Z');
    console.log(sYp[sYp.length - 1]);

    return `<g class="surfaces">\n\t<path d="${buffer.join(' ')}"></path>\n</g>`;
  }
}

class Points extends Calc {
  /**
   * @param data Construction info about graph
   * @param pointsPercentage Percentage of each point location number of values must be number of rows + 1
   */
  constructor(protected data: Info, protected pointsPercentage: Array<number>) {
    super(data, pointsPercentage);
  }

  /**
   * Getter which return string with points
   * @returns {string} SVG surface
   */
  public get getPoints(): string {
    return this.parse();
  }

  private parse(): string {
    const points = this.getResult;

    const circleLayout = (x: number, y: number): string => {
      return `<circle cx="${x * this.data.factor}" cy="${y * this.data.factor}" r="${
        2 * this.data.factor
      }"></circle> `;
    };

    let buffer: Array<string> = [];

    for (let i = 0; i < points.length; i += 1) {
      //^ X of the point of index i and y
      buffer.push(circleLayout(points[i][0], points[i][1]));
    }

    return `<g class="points">\n\t${buffer.join('\n\t')}\n</g>`;
  }
}

export { Surface, Points };
