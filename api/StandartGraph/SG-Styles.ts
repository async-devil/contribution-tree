import { themes, Theme } from '../../themes/SG-themes';
import GTSF from './SG-GradientToSVG';

interface Data {
  [key: string]: Theme;
}

interface colorOrGradientOutput {
  error?: string;
  result?: {
    CSS: string;
    SVG?: {
      CSS: string;
      HTML: string;
    };
  };
}

class Styles {
  public choice: string;

  constructor(choice: string) {
    this.choice = choice;
  }

  //^Matching theme, if theme not found returns default one
  public matchTheme(): Theme {
    return themes[this.choice] || themes.default;
  }

  public colorOrGradientParcer(data: string): colorOrGradientOutput {
    //^ If data is hex, than returns data as CSS
    if (data.search(/(^#[0-9a-fA-F]{3}$)|(^#[0-9a-fA-F]{6}$)/gm) !== -1) {
      const output: colorOrGradientOutput = {
        result: {
          CSS: data,
        },
      };
      return output;
    }

    const gtsf = new GTSF(data);
    const SVG = gtsf.construct();

    //^ If data contains invalid info than returns error
    if (SVG.error !== undefined || SVG.result === undefined) {
      const output: colorOrGradientOutput = {
        error: SVG.error,
      };
      return output;
    }

    const output: colorOrGradientOutput = {
      result: {
        CSS: gtsf.parcedGradientInfoToCSS(gtsf.regexCut(data)),
        SVG: {
          CSS: SVG.result.css,
          HTML: SVG.result.html,
        },
      },
    };

    return output;
  }

  public chooseColorDefiningWord(property: string) {
    //^ Getting interface keys via its child
    const keys = Object.keys(this.matchTheme());

    //^ If keys don`t contain property, returns error
    if (!keys.includes(property)) {
      const output = {
        error: 'Invalid property',
      };
      return output;
    }

    //^ Declaring parametrs of theme property
    switch (property) {
      case 'line':
        return {
          element: '.grid',
          property: 'stroke',
          html: true,
        };
      case 'backgroung':
        return {
          element: 'svg',
          property: 'background',
          html: false,
        };
      case 'points':
        return {
          element: '.points',
          property: 'fill',
        };
      case 'surface':
        return {
          element: '.surfaces',
          property: 'fill',
          html: true,
        };
    }
  }

  public gettingInfoFromThemes() {
    const theme: Theme = this.matchTheme();

    let parcedTheme: string[] = [];
    Object.keys(theme).map((key) => {
      if (this.colorOrGradientParcer(theme[key]).error !== undefined) {
      }
    });
  }
}

export { Styles };
