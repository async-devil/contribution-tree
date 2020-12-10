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

  public colorOrGradientParcer(data: string) {
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
    //TODO: create this method
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
