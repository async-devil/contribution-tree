import { themes, Theme } from '../../themes/SG-themes';
import GTSF from './SG-GradientToSVG';

/**
 * Output of {@link colorOrGradient} method
 * @alias colorOrGradientOutput
 */
type ColorOrGradientOutput = {
  /** Type of output */
  type: string;
  result: {
    /** CSS code or color*/
    css?: string;
    /** CSV code */
    svg?: {
      /** CSS code from SVG */
      css: string;
      /** HTML code from SVG */
      html: string;
    };
  };
};

/**
 * Group of {@link Element}
 * @alias Elements
 */
type Elements = {
  /** Element name */
  [key: string]: Element;
};

/**
 * Component of {@link Elements}
 * Type which is describing element and its properties
 * @alias Element
 */
type Element = {
  /** HTML element which needs to be stylished */
  element: string;
  /** CSS property of element */
  property: string;
  /** Is HTML required (like in SVG) */
  html: boolean;
};

/**
 * Component of {@link ParsedElements}
 * Type which is describing parsed element and its properties
 * @alias ParsedElement
 */
type ParsedElement = {
  /** HTML element which needs to be stylished */
  element: string;
  /** CSS property of element */
  property: string;
  /** Is HTML required (like in SVG) */
  html: boolean;
  /** Values of element*/
  value: {
    /** CSS code of SVG gradient or just CSS code */
    css: string;
    /** HTML code of SVG gradient */
    html?: string;
  };
};

/**
 * Group of {@link ParsedElement}
 * @alias ParsedElements
 */
type ParsedElements = {
  [key: string]: ParsedElement;
};
/*------------------------------------------------------------------------------------------*/

/** Data containing class */
class Data {
  public readonly selectedTheme: string;

  /**
   * @param selectedTheme Theme which is need to be parced
   */
  constructor(selectedTheme: string) {
    this.selectedTheme = selectedTheme;
  }
}

/*------------------------------------------------------------------------------------------*/

/*------------------------------------------------------------------------------------------*/

/** Utilities functionality class */
class Utilities {
  /** @param dev Dev logs enabling */
  public dev: boolean = false;

  /**
   * Setter which can enable and disable devMode
   * @param {boolean} enable On or off choice
   */
  public set devMode(enable: boolean) {
    this.dev = enable;
  }
  /**
   * Console log which is called only if dev param is true
   * @param {any} message Message which is need to be logged
   */
  public devLog(message?: any) {
    if (this.dev === true) {
      console.log(message);
    }
  }
}

/*------------------------------------------------------------------------------------------*/

/*------------------------------------------------------------------------------------------*/

/** Theme checking functionality */
class CheckTheme {
  protected selectedTheme: string = 'default';

  /**
   * Setter which allows setting name of the theme which is need to be checked
   * @param {string} selectedTheme Name of the theme
   */
  public set setSelectedTheme(selectedTheme: string) {
    this.selectedTheme = selectedTheme;
  }

  /**
   * Matches theme by name, if theme not found returns default one
   * @returns {Theme}
   */
  public matchTheme(): Theme {
    return themes[this.selectedTheme] || themes.default;
  }

  /**
   * Checks if theme is valid
   * @returns {boolean}
   */
  public isValidTheme(): boolean {
    return themes[this.selectedTheme] ? true : false;
  }
}

/*------------------------------------------------------------------------------------------*/

/*------------------------------------------------------------------------------------------*/

/** Class which contains method to parse color or gradient into a CSS or SVG property */
class ColorOrGradient {
  private input: string;

  /** @param {string} input Hex color or CSS-like gradient */
  constructor(input: string) {
    this.input = input;
  }

  /**
   * Getter which returns parsed input
   * @returns {colorOrGradientOutput|Error} Output object or error
   */
  public get getResult() {
    return this.parse();
  }

  private parse() {
    const util = new Utilities();
    util.devMode = false; //! DevMode enabling

    //^ If data is hex, than returns data as CSS
    if (this.input.search(/(^#[0-9a-fA-F]{3}$)|(^#[0-9a-fA-F]{6}$)/gm) !== -1) {
      const output: ColorOrGradientOutput = {
        type: 'color',
        result: {
          css: this.input,
        },
      };
      return output;
    }

    const gtsf = new GTSF(this.input);

    util.devLog(this.input);
    //^ Error can be here
    const SVG = gtsf.construct();

    const output: ColorOrGradientOutput = {
      type: 'gradient',
      result: {
        css: gtsf.parsedGradientInfoToCSS(gtsf.regexCut(this.input)),
        svg: {
          css: SVG.css,
          html: SVG.html,
        },
      },
    };

    return output;
  }
}

/*------------------------------------------------------------------------------------------*/

/*------------------------------------------------------------------------------------------*/

/** Class which contains methods to set CSS properties to graph element */
class PropertyDefiningKey extends Data {
  protected element: string = '';

  /**
   * @param {string} selectedTheme Theme which is need to be parced
   */
  constructor(selectedTheme: string) {
    super(selectedTheme);
  }

  /**
   * Setter which allows setting element which is need to be checked
   * @param {string} element Graph element
   */
  public set setElement(element: string) {
    this.element = element;
  }

  /**
   * Getter which returns supported elements
   * @returns {Elements} Supported elements
   */
  public get getElements(): Elements {
    return this.elements;
  }

  /** Element properties are declaring here */
  protected elements: Elements = {
    line: {
      element: '.grid',
      property: 'stroke',
      html: false,
    },
    background: {
      element: 'svg',
      property: 'background',
      html: false,
    },
    points: {
      element: '.points',
      property: 'fill',
      html: false,
    },
    surface: {
      element: '.surfaces',
      property: 'fill',
      html: true,
    },
  };

  /**
   * Getter which returns CSS properties of specific graph element
   * @returns {Property|Error} Property object or error
   */
  public get getResult(): Element {
    return this.parse();
  }

  private parse(): Element {
    const util = new Utilities();
    util.devMode = false; //! DevMode enabling

    const CT = new CheckTheme();
    CT.setSelectedTheme = this.selectedTheme;

    //^ Getting type keys via its child
    const matchThemeKeys = Object.keys(CT.matchTheme());

    //^ If keys don`t contain property, throws error
    if (!matchThemeKeys.includes(this.element)) {
      util.devLog('Invalid property error: ' + this.element);
      throw new Error('Invalid property');
    }

    //^ Declaring parametrs of theme property
    const elementsKeys = Object.keys(this.elements);
    for (let i = 0; i < elementsKeys.length; i += 1) {
      if (elementsKeys[i] === this.element) {
        return this.elements[elementsKeys[i]];
      }
    }

    util.devLog('Parametrs not found error: ' + this.elements);
    throw new Error('Parametrs not found');
  }
}

/*------------------------------------------------------------------------------------------*/

/*------------------------------------------------------------------------------------------*/

/** Class which contains methods to transform theme elements into code */
class ThemeElementsToCode extends Data {
  /**
   * @param {string} selectedTheme Theme which is need to be parced
   */
  constructor(selectedTheme: string) {
    super(selectedTheme);
  }

  /**
   * Method which transforms group of parametrs into CSS code
   * @param {string} element HTML element which needs to be stylished
   * @param {string} property CSS property of element
   * @param {string} value CSS value
   * @returns {string} CSS code
   */
  protected cssConstruct(element: string, property: string, value: string): Object {
    return {
      css: `${element} {
      ${property}: ${value} 
    }`,
    };
  }

  /**
   * Parcing info from theme into one object
   * @returns {ParsedElements} {@link ParsedElements}
   */
  public gettingInfoFromTheme(): ParsedElements {
    const CT = new CheckTheme();
    CT.setSelectedTheme = this.selectedTheme;

    const PDK = new PropertyDefiningKey(this.selectedTheme);

    const theme: Theme = CT.matchTheme();

    let parcedTheme: any = {};
    //^ For each theme keys
    Object.keys(theme).map((key) => {
      let CoG = new ColorOrGradient(theme[key]);
      try {
        let test = CoG.getResult;
      } catch (err) {
        throw new Error(err.message);
      }
      //^ Defining parcedTheme elements
      PDK.setElement = key;
      parcedTheme[key] = PDK.getResult;
      parcedTheme[key]['value'] = theme[key];
    });

    Object.keys(parcedTheme).map((key) => {
      //^ If element has a html parametr
      if (parcedTheme[key].html === true) {
        const gtsf = new GTSF(parcedTheme[key].value);
        const gradientSVGInfo = gtsf.construct();

        parcedTheme[key].value = gradientSVGInfo;
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

/*------------------------------------------------------------------------------------------*/

class Styles extends Data {
  constructor(selectedTheme: string) {
    super(selectedTheme);
  }

  protected transform() {}
}

export { Styles as default };
export { CheckTheme, ColorOrGradient, PropertyDefiningKey };
