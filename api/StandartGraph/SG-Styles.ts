import { themes, Theme } from '../../themes/SG-themes';
import GTSF from './SG-GradientToSVG';

class Data {
  public readonly dev: boolean;
  public readonly selectedTheme: string;

  /**
   * @param selectedTheme Theme which is need to be parced
   * @param dev Dev mode enabling
   */
  constructor(selectedTheme: string, dev?: boolean) {
    this.selectedTheme = selectedTheme;
    this.dev = dev || false;
  }

  protected devLog(message?: any) {
    if (this.dev === true) {
      console.log(message);
    }
  }
}

/** Theme checking functionality */
class CheckTheme extends Data {
  /**
   * Matches theme by name, if theme not found returns default one
   * @returns {Theme} {@link Theme}
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

class colorOrGradient extends Data {
  private data: string = '';

  protected set toCheck(data: string) {
    this.data = data;
  }

  private get getResult() {
    return this.parse(this.data);
  }

  private parse(data: string) {
    //^ If data is hex, than returns data as CSS
    if (data.search(/(^#[0-9a-fA-F]{3}$)|(^#[0-9a-fA-F]{6}$)/gm) !== -1) {
      const output: any = {
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
      const output: any = {
        error: SVG.error,
      };
      return output;
    }

    const output: any = {
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
}

class Styles extends Data {
  constructor(selectedTheme: string, dev?: boolean) {
    super(selectedTheme, dev);
  }

  protected transform() {}
}

export { Styles as default };
export { CheckTheme, colorOrGradient };
