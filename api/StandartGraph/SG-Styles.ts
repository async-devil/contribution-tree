import { themes, Theme } from '../../themes/SG-themes';
import GTSF from './SG-GradientToSVG';

/**
 * Output of {@link colorOrGradient} method
 * @alias colorOrGradientOutput
 */
type colorOrGradientOutput = {
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
 * Type which is describing element and its properties
 * @alias Elements
 */
type Elements = {
  /** Element name */
  [key: string]: Property;
};

/**
 * Component of {@link Elements}
 * @alias Property
 */
type Property = {
  /** HTML element which needs to be stylished */
  element: string;
  /** CSS property of element */
  property: string;
  /** Is HTML required (like in SVG) */
  html: boolean;
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
class CheckTheme extends Data {
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
      const output: colorOrGradientOutput = {
        type: 'color',
        result: {
          css: this.input,
        },
      };
      return output;
    }

    util.devLog(this.input);
    const gtsf = new GTSF(this.input);
    const SVG = gtsf.construct();

    const output: colorOrGradientOutput = {
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
  protected element: string;

  /**
   * @param {string} selectedTheme Theme which is need to be parced
   * @param {string} element Graph element
   */
  constructor(selectedTheme: string, element: string) {
    super(selectedTheme);
    this.element = element;
  }

  /** Getter which returns supported elements*/
  public get getElements(): Elements {
    return this.elements;
  }

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
  public get getResult(): Property {
    return this.parse();
  }

  private parse(): Property {
    const util = new Utilities();
    util.devMode = false; //! DevMode enabling

    const CT = new CheckTheme(this.selectedTheme);
    //^ Getting type keys via its child
    const matchThemeKeys = Object.keys(CT.matchTheme());

    //^ If keys don`t contain property, throws error
    if (!matchThemeKeys.includes(this.element)) {
      util.devLog(this.element);
      throw new Error('Invalid property');
    }

    //^ Declaring parametrs of theme property
    const elementsKeys = Object.keys(this.elements);
    for (let i = 0; i < elementsKeys.length; i += 1) {
      if (elementsKeys[i] === this.element) {
        return this.elements[elementsKeys[i]];
      }
    }

    util.devLog(this.elements);
    throw new Error('Parametrs not found');
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
