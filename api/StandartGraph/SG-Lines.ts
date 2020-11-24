import { Data, Info } from './SG-Data';

class Lines extends Data {
  constructor(data: Info) {
    super(data);
  }

  public initX() {
    let buffer: string[] = [];
    let yVals = this.startYPoints(this.data.rows - 1);
    buffer.push(this.gStart('x'));
    for (let i = 0; i < yVals.length; i += 1) {
      // prettier-ignore
      buffer.push(this.line(
        this.data.startPoints.x, 
        yVals[i], 
        this.totalWidth(), 
        yVals[i]));
    }
    buffer.push(this.gEnd);
    return buffer.join('\n');
  }

  public initY() {
    let buffer: string[] = [];
    let xVals = this.startXPoints(this.data.columns - 1);
    buffer.push(this.gStart('y'));
    for (let i = 0; i < xVals.length; i += 1) {
      // prettier-ignore
      buffer.push(this.line(
        xVals[i], 
        this.data.startPoints.y, 
        xVals[i], 
        this.totalHeight()));
    }
    buffer.push(this.gEnd);
    return buffer.join('\n');
  }
}

export { Lines, Info };
