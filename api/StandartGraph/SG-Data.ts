/**
 * Info about graph
 * @alias Info */
type Info = {
  /** Number of rows */
  rows: number;
  /** Number of colomns */
  columns: number;
  /** X and Y of start point */
  startPoints: {
    x: number;
    y: number;
  };
  /** Width of inner part of graph */
  insideWidth: number;
  /** Height of inner part of graph */
  insideHeight: number;
  /** Width of outer part of graph */
  outsideWidth: number;
  /** Height of outer part of graph */
  outsideHeight: number;
  /** Value which describes aspect ratio */
  factor: number;
};

class Data {
  constructor(protected readonly data: Info) {}

  // prettier-ignore
  public svgStart(): string {
    return `<svg width="${
      this.totalWidth() * this.data.factor
    }" height="${
      this.totalHeight() * this.data.factor
    }" viewBox="0 0 ${
      this.totalWidth() * this.data.factor
    } ${
      this.totalHeight() * this.data.factor
    }" fill="none" xmlns="http://www.w3.org/2000/svg">`;
  }
  public gStart(value: string): string {
    return `<g class="grid ${value}-grid">`;
  }
  // prettier-ignore
  public line(x1: number, y1: number, x2: number, y2: number): string {
    return `\t<line x1="${x1 * this.data.factor}" y1="${y1 * this.data.factor}" x2="${
      x2 * this.data.factor
    }" y2="${y2 * this.data.factor}" stroke-width="${this.data.factor * 0.1}px"/>`;
  }
  public gEnd: string = `</g>`;
  public svgEnd: string = `</svg>`;
  // prettier-ignore
  public totalWidth(): number {
    return this.data.startPoints.x
    + this.data.insideWidth
    + this.data.outsideWidth;
  }
  // prettier-ignore
  public totalHeight(): number {
    return this.data.insideHeight 
    + this.data.outsideHeight 
    + this.data.startPoints.y;
  }

  /** @param {number} num Number of columns*/
  public startXPoints(num: number): number[] {
    let buffer: number[] = [];
    let startAndOut = this.data.startPoints.x + this.data.outsideWidth;
    for (let i = 0; i <= num; i++) {
      let x: number;
      x = (this.data.insideWidth / num) * i + startAndOut;
      if (i === 0) {
        x = startAndOut;
      }
      buffer.push(x);
    }
    return buffer;
  }

  /** @param {number} num Number of rows*/
  public startYPoints(num: number): number[] {
    let buffer: number[] = [];
    for (let i = 0; i <= num; i++) {
      let y: number;
      y = (this.data.insideHeight / num) * i + this.data.startPoints.y;
      if (i === 0) {
        y = this.data.startPoints.y;
      }
      buffer.push(y);
    }
    return buffer;
  }
}

export { Data, Info };
