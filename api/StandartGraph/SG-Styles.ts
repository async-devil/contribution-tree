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

  public isValidTheme(): boolean {
    return themes[this.choice] ? true : false;
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
          html: false,
        };
      case 'background':
        return {
          element: 'svg',
          property: 'background',
          html: false,
        };
      case 'points':
        return {
          element: '.points',
          property: 'fill',
          html: false,
        };
      case 'surface':
        return {
          element: '.surfaces',
          property: 'fill',
          html: true,
        };
    }
    const output = {
      error: 'Invalid property',
    };
    return output;
  }

  public cssConstruct(element: string, property: string, value: string) {
    return {
      result: {
        css: `${element} {
      ${property}: ${value} 
    }`,
      },
    };
  }

  public gettingInfoFromThemes() {
    const theme: Theme = this.matchTheme();

    let parcedTheme: any = {};
    //^ For each theme keys
    Object.keys(theme).map((key) => {
      //^ If error doesn`t attached
      if (this.colorOrGradientParcer(theme[key]).error === undefined) {
        //^ Defining parcedTheme elements
        parcedTheme[key] = this.chooseColorDefiningWord(key);
        parcedTheme[key]['value'] = theme[key];
      }
    });

    Object.keys(parcedTheme).map((key) => {
      //^ If element has a html parametr
      if (parcedTheme[key].html === true) {
        const gtsf = new GTSF(parcedTheme[key].value);
        const gradientCVGInfo = gtsf.construct();

        //^ If error not attached
        if (gradientCVGInfo.error === undefined || gradientCVGInfo.result !== undefined) {
          parcedTheme[key].value = gradientCVGInfo;
        } else {
          //^ Else returning default value
          parcedTheme[key].value = themes.default[key];
        }
      } else {
        parcedTheme[key].value = this.cssConstruct(
          parcedTheme[key].element,
          parcedTheme[key].property,
          parcedTheme[key].value,
        );
      }
    });

    return parcedTheme;
  }
}

export { Styles };
