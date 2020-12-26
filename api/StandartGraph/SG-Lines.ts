import { Data, Info } from './SG-Data';

class Lines extends Data {
  constructor(data: Info) {
    super(data);
  }

  public initX() {
    let buffer: string[] = [];
    /*
    ? I need to use Y values in X lines because
    ? startPointsX have same X coordinates the only differnce is Y
    ! Graph visualized in ./graph.md
    */
    let yVals = this.startYPoints(this.data.rows - 1);
    buffer.push(this.gStart('x'));

    //^ Pushing each x lines into buffer array
    for (let i = 0; i < yVals.length; i += 1) {
      buffer.push(this.line(this.data.startPoints.x, yVals[i], this.totalWidth(), yVals[i]));
    }

    buffer.push(this.gEnd);
    return buffer.join('\n');
  }

  public initY() {
    let buffer: string[] = [];
    //? Same situation as initX method has, but static are Y coordinates
    let xVals = this.startXPoints(this.data.columns - 1);
    buffer.push(this.gStart('y'));

    //^ Pushing each y lines into buffer array
    for (let i = 0; i < xVals.length; i += 1) {
      buffer.push(this.line(xVals[i], this.data.startPoints.y, xVals[i], this.totalHeight()));
    }

    buffer.push(this.gEnd);
    return buffer.join('\n');
  }

  public generate() {
    const buffer: string[] = [];
    buffer.push(this.initX(), this.initY());

    return buffer.join('\n');
  }
}

export { Lines, Info };
