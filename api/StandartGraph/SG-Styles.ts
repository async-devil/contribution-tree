import { themes, Theme } from '../../themes/SG-themes';
import GTSF from './SG-GradientToSVG';

/**
 * Output of {@link colorOrGradientParcer} method
 * @alias colorOrGradientOutput
 */

type colorOrGradientOutput = {
  /** Error message */
  error?: string;
  /** Only exists if error hasn`t appeared */
  result?: {
    /** Contains CSS gradient if gradient has detected or hex color if not */
    CSS: string;
    /** SVG option, only exists if gradient has detected */
    SVG?: {
      /** CSS code of SVG gradient */
      CSS: string;
      /** HTML code of SVG gradient */
      HTML: string;
    };
  };
};

/**
 * Output of {@link chooseColorDefiningWord} method
 * @alias chooseColorDefiningWordOutput
 */
type chooseColorDefiningWordOutput = {
  /** Error message */
  error?: string;
  /** HTML element which needs to be stylished */
  element?: string;
  /** CSS property of element */
  property?: string;
  /** Is HTML required */
  html?: boolean;
};

/**
 * Output of {@link cssConstruct} method
 * @alias cssConstructOutput
 */
type cssConstructOutput = {
  result: {
    /** CSS code */
    css: string;
  };
};

/**
 * Output of {@link gettingInfoFromThemes} method
 * @alias gettingInfoFromThemesOutput
 */
type gettingInfoFromThemesOutput = {
  /** Line properties */
  line: {
    /** HTML element which needs to be stylished */
    element: string;
    /** CSS property of element */
    property: string;
    /** Is HTML required */
    html: boolean;
    /** More detailed CSS info */
    value: {
      result: {
        /** CSS code */
        css: string;
      };
    };
  };
  /** Background properties */
  background: {
    /** HTML element which needs to be stylished */
    element: string;
    /** CSS property of element */
    property: string;
    /** Is HTML required */
    html: boolean;
    /** More detailed CSS info */
    value: {
      result: {
        /** CSS code */
        css: string;
      };
    };
  };
  /** Points properties */
  points: {
    /** HTML element which needs to be stylished */
    element: string;
    /** CSS property of element */
    property: string;
    /** Is HTML required */
    html: boolean;
    /** More detailed CSS info */
    value: {
      result: {
        /** CSS code */
        css: string;
      };
    };
  };
  /** Surface properties */
  surface: {
    /** HTML element which needs to be stylished */
    element: string;
    /** CSS property of element */
    property: string;
    html: boolean;
    /** More detailed HTML and CSS SVG info */
    value: {
      result?: {
        /** HTML code of SVG gradient */
        html: string;
        /** CSS code of SVG gradient */
        css: string;
      };
      error?: string;
    };
  };
  /** Type must be update if something new has been added */
  [key: string]: any;
};

/**
 * Class which contains methods to operate with styles
 */
class Styles {
  /**
   * @param {string} choice
   * Contains theme name
   */
  protected choice: string;

  constructor(choice: string) {
    this.choice = choice;
  }

  /**
   * Matches theme by name, if theme not found returns default one
   * @returns {Theme} {@link Theme}
   */
  public matchTheme(): Theme {
    return themes[this.choice] || themes.default;
  }

  /**
   * Checks if theme is valid
   * @returns {boolean}
   */
  public isValidTheme(): boolean {
    return themes[this.choice] ? true : false;
  }

  /**
   * Checks if info is hex color or CSS-like gradient
   * @param {string} data hex color or CSS-like gradient
   * @returns {colorOrGradientOutput} {@link colorOrGradientOutput}
   */
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

    //^If data contains invalid info than returns error
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

  public chooseColorDefiningWord(property: string): chooseColorDefiningWordOutput {
    //^ Getting type keys via its child
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

  /**
   * @param {string} element HTML element which is need to be stylished
   * @param {string} property CSS property of element
   * @param {string} value CSS value of selected property
   *
   * @returns {cssConstructOutput} {@link cssConstructOutput}
   */
  public cssConstruct(element: string, property: string, value: string): cssConstructOutput {
    return {
      result: {
        css: `${element} {
      ${property}: ${value} 
    }`,
      },
    };
  }

  /**
   * Parcing info from theme into one object
   * @returns {gettingInfoFromThemesOutput} {@link gettingInfoFromThemesOutput}
   */
  public gettingInfoFromThemes(): gettingInfoFromThemesOutput {
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

  public transform() {
    const info = this.gettingInfoFromThemes();
  }
}

export { Styles };
