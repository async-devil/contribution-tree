interface Info {
  multiplySymbol: string;
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
}

const svgStart = function (width: number, height: number, symb: string): string {
  return `<svg width="{{${symb} ${width}}}" height="{{${symb} ${height}}}">`;
};
const globalStart = function (value: string): string {
  return `<g class="grid ${value}-grid">`;
};
const line = function (x1: number, y1: number, x2: number, y2: number, symb: string): string {
  return `<line x1="{{${symb} ${x1}}}" y1="{{${symb} ${y1}}}" x2="{{${symb} ${x2}}}" y2="{{${symb} ${y2}}}"/>`;
};
const globalEnd: string = `</g>`;
const svgEnd: string = `</svg>`;

const create = function (config: Info) {
  let data = config;

  if (data.startPoints.x < 0 || data.startPoints.y < 0) {
    Object.assign(data.startPoints, { x: 0, y: 0 });
  }

  const xLines = function (num: number): string {
    let buffer: string[] = [];
    for (let i = 0; i <= num; i++) {
      let y: number;
      y = (data.insideHeight / num) * i + data.startPoints.y;
      if (i === 0) {
        y = data.startPoints.y;
      }
      buffer.push(
        line(
          data.startPoints.x,
          y,
          data.startPoints.x + data.insideWidth + data.outsideWidth,
          y,
          data.multiplySymbol,
        ),
      );
    }
    return buffer.join('\n');
  };

  const yLines = function (num: number): string {
    let buffer: string[] = [];
    for (let i = 0; i <= num; i++) {
      let x: number;
      x = (data.insideWidth / num) * i + data.startPoints.x + data.outsideWidth;
      if (i === 0) {
        x = data.startPoints.x + data.outsideWidth;
      }
      buffer.push(
        line(
          x,
          data.startPoints.y,
          x,
          data.insideHeight + data.outsideHeight + data.startPoints.y,
          data.multiplySymbol,
        ),
      );
    }
    return buffer.join('\n');
  };

  let buffer: string[] = [];
  buffer.push(
    svgStart(
      data.startPoints.x + data.outsideWidth + data.insideWidth,
      data.insideHeight + data.outsideHeight + data.startPoints.y,
      data.multiplySymbol,
    ),
    globalStart('x'),
    xLines(data.rows - 1),
    globalEnd,
    globalStart('y'),
    yLines(data.columns - 1),
    globalEnd,
    svgEnd,
  );
  return buffer.join('\n');
};

export { create as default };
