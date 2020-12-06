import { themes, Theme } from '../../themes/SG-themes';
import GTSF from './SG-GradientToSVG';

interface Data {
  [key: string]: Theme;
}

class Styles {
  public choice: string;

  constructor(choice: string) {
    this.choice = choice;
  }

  public matchTheme(): Theme {
    return themes[this.choice] || themes.default;
  }

  public colorOrGradientParcer(data: string) {
    if (data.search(/(^#[0-9a-fA-F]{3}$)|(^#[0-9a-fA-F]{6}$)/gm) !== -1) {
      return data;
    }
    //TODO: think over about different css color declarations
  }

  public gettingInfoFromThemes() {
    const theme: Theme = this.matchTheme();

    let parcedTheme: string[] = [];
    Object.keys(theme).map((key) => {
      theme[key];
    });
  }
}

export { Styles };
