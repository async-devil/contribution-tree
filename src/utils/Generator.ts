interface Info {
  rows: number;
  columns: number;
  startPoints: {
    x: number;
    y: number;
  };
  insideWidth: number;
  insideHeight: number;
  outsideWidth: number;
  outsideHeight: number;
  factor: number;
}

class Data {
  readonly data: Info;

  constructor(data: Info) {
    this.data = data;
  }

  public svgStart(): string {
    return `<svg width="${this.totalWidth() * this.data.factor}" height="${
      this.totalHeight() * this.data.factor
    }">`;
  }
  public gStart(value: string): string {
    return `<g class="grid ${value}-grid">`;
  }
  public line(x1: number, y1: number, x2: number, y2: number): string {
    return `<line x1="${x1 * this.data.factor}" y1="${y1 * this.data.factor}" x2="${
      x2 * this.data.factor
    }" y2="${y2 * this.data.factor}"/>`;
  }
  public gEnd: string = `</g>`;
  public svgEnd: string = `</svg>`;

  public totalWidth(): number {
    return this.data.startPoints.x + this.data.insideWidth + this.data.outsideWidth;
  }
  public totalHeight(): number {
    return this.data.insideHeight + this.data.outsideHeight + this.data.startPoints.y;
  }

  public startXPoints(num: number): number[] {
    let buffer: number[] = [];
    for (let i = 0; i <= num; i++) {
      let x: number;
      x = (this.data.insideWidth / num) * i + this.data.startPoints.x + this.data.outsideWidth;
      if (i === 0) {
        x = this.data.startPoints.x + this.data.outsideWidth;
      }
      buffer.push(x);
    }
    return buffer;
  }
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

class Lines extends Data {
  constructor(data: Info) {
    super(data);
  }

  public initX() {
    let buffer: string[] = [];
    let yVals = this.startYPoints(this.data.rows - 1);
    buffer.push(this.gStart('x'));
    for (let i = 0; i < yVals.length; i += 1) {
      buffer.push(this.line(this.data.startPoints.x, yVals[i], this.totalWidth(), yVals[i]));
    }
    buffer.push(this.gEnd);
    return buffer.join('\n');
  }

  public initY() {
    let buffer: string[] = [];
    let xVals = this.startXPoints(this.data.columns - 1);
    buffer.push(this.gStart('y'));
    for (let i = 0; i < xVals.length; i += 1) {
      buffer.push(this.line(xVals[i], this.data.startPoints.y, xVals[i], this.totalHeight()));
    }
    buffer.push(this.gEnd);
    return buffer.join('\n');
  }
}

class Generator extends Lines {
  constructor(data: Info) {
    super(data);
  }

  public generate() {
    let buffer: string[] = [];
    buffer.push(this.svgStart(), this.initX(), this.initY(), this.svgEnd);
    return buffer.join('\n');
  }
}

export { Generator, Info };
