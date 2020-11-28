import { themes, Theme } from '../../themes/SG-themes';

class Styles {
  public choice: string;

  constructor(choice: string) {
    this.choice = choice;
  }
}

class GradientToSVGFormat {
  public isGradient(input: string) {
    let gradientDataArray = input.replace(/(^l.*\()|(\))/gm, '').split(',');
    if (gradientDataArray.length === 0) return false;
  }

  public regexCut() {}
}

export { Styles, GradientToSVGFormat };
