import { themes, Theme } from '../../themes/SG-themes';

interface gradient {
  gradientParams: Array<Array<string>>;
  degrees: string;
}

interface ArrayWithArrayOrNullAndStringOrNull {
  color: string | null;
  gradient: gradient | null;
}

class Styles {
  private choice: string;

  constructor(choice: string) {
    this.choice = choice;
  }

  public matchTheme(): Theme {
    return themes[this.choice] || themes.default;
  }

  public degToStandartOnes(deg: number): number {
    //^ Transforms 1 to 45 etc
    if (deg === 360) return 0;
    for (let index = 0; index != 360; index += 45) {
      if (deg > index && deg <= index + 45) return index + 45;
    }
    return deg;
  }

  public degToXY(deg: string): string {
    //^Transforms degrees to svg form
    let degInt = parseInt(deg.replace('%', ''));

    let degrees: number = this.degToStandartOnes(degInt);

    function fill(x1: number, y1: number, x2: number, y2: number) {
      return `x1="${x1}%" y1="${y1}%" x2="${x2}%" y2="${y2}%"`;
    }

    //TODO: make it less lame, make algorithm or smth
    if (degrees === 0) return fill(0, 100, 0, 0);
    if (degrees === 45) return fill(0, 100, 100, 0);
    if (degrees === 90) return fill(0, 0, 100, 0);
    if (degrees === 135) return fill(0, 0, 100, 100);
    if (degrees === 180) return fill(0, 0, 0, 100);
    if (degrees === 225) return fill(100, 0, 0, 100);
    if (degrees === 270) return fill(100, 0, 0, 0);
    if (degrees === 315) return fill(100, 100, 0, 0);

    return fill(0, 100, 0, 0);
  }

  public gradientParamsToSVG(array: Array<Array<string>>, XY: string, id: string) {
    //^ Making SVG gradient code
    function fill(percent: string, hex: string) {
      return `<stop offset="${percent}" stop-color=${hex}/>`;
    }

    let buffer: string[] = [];

    buffer.push(`<linearGradient id="${id}" ${XY}>`);
    for (let index = 0; index < array.length; index++) {
      //^ If percent - undefined, returns 0%
      buffer.push(fill(array[index][1], array[index][0] || '0%'));
    }
    buffer.push('</linearGradient>');

    return buffer.join('\n');
  }

  public cssColorToGradientParamsOrHexAndNull(value: string): ArrayWithArrayOrNullAndStringOrNull {
    //^ Searching for linear-gradient
    if (value.search(/^l.*t/gm) !== -1) {
      //^ Deleting useless stuff and spliting by comma
      let result = value.replace(/(^l.*\()|(\))/gm, '').split(',');
      let data: any = {};

      //^ Searching for degrees, if not found - null
      data.degrees = result[0].match(/^\d+deg/gm);
      if (data.degrees !== null) data.degrees = data.degrees[0];
      else data.degrees = '0%';

      data.gradientParams = [];
      //^ Making array like [['#000000', '0%']]
      for (let i = 0; i < result.length; i++) {
        if (result[i].match(/^\d+deg/gm)) continue;

        let buffer = result[i].replace(/^ /gm, '').split(' ');
        data.gradientParams.push(buffer);
      }

      return {
        color: null,
        gradient: { gradientParams: data.gradientParams, degrees: data.degress },
      };
    } else if (value.search(/^#[0-9a-fA-F]{6}$/gm) !== -1) {
      //^ Searching for hex color
      return { color: value, gradient: null };
    } else {
      //^ If wrote something that is not the standart hex color
      return { color: '#EE00EE', gradient: null };
    }
  }

  public dataHandler() {
    //^ Only way I've found
    let $this = this;
    let selectedTheme: any = this.matchTheme();
    let buffer = { gradient: null };

    function findGradientOrHex(value: string) {
      let handledValue = $this.cssColorToGradientParamsOrHexAndNull(value);

      if (handledValue.color === null && handledValue.gradient !== null) {
        return $this.gradientParamsToSVG(
          handledValue.gradient.gradientParams,
          $this.degToXY(handledValue.gradient.degrees), //TODO: finish id part
        );
      }
    }
  }

  public cssCode(theme: any): string {
    const selectedTheme = this.matchTheme();

    return `
		<style type="text/css">
      body {
        width: 100%;
        height: 100%;
      }
      svg {
        fill: //TODO
      }
      .grid {
      	stroke: //TODO
      	stroke-width: 0.2;
      }
      .points {
        fill: //TODO
      }
      .surfaces {
        fill: //TODO
      }
      </style>
      
		`;
  }
}

export { Styles };
