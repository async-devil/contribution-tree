import { themes, Theme } from '../../themes/SG-themes';

class Styles {
  public choice: string;

  constructor(choice: string) {
    this.choice = choice;
  }
}

class GradientToSVGFormat {
  public isGradient(input: string) {
    //^ If input contains rgb(...), returns false
    if (input.search(/rgb\(.*?\)/gm) !== -1)
      return { result: false, error: 'Contains invalid color' };

    //^ Getting gradient information in [deg, id, stops] format
    let gradientDataArray = input.replace(/(^l.*?\()|(\)$)/gm, '').split(',');

    console.log(gradientDataArray); //TODO: delete this debug log

    //^ If nothing found returns false
    if (gradientDataArray.length === 0)
      return { result: false, error: 'Gradient contains nothing' }; //TODO: errors

    //^ If number of arguments less than 3 returns false
    if (gradientDataArray.length < 3) return false;

    //^ Deleting first space if they are exist
    for (let i = 0; i < gradientDataArray.length; i += 1) {
      gradientDataArray[i] = gradientDataArray[i].replace(/^ /gm, '');
    }

    //^ If number with deg not found then returns false
    if (gradientDataArray[0].search(/^\d{0,3}deg$/gm) === -1) return false;

    //^ If id not found returns false
    if (gradientDataArray[1].search(/^id=.*$/gm) === -1) return false;

    //^ Getting color and percentage into an array in array
    let gradientStopsInfo: Array<Array<string>> = [];
    for (let i = 0; i < gradientDataArray.length - 2; i += 1) {
      gradientStopsInfo[i] = gradientDataArray[i + 2].split(' ');
    }

    //^ Grabbing each of stop point properties
    for (let i = 0; i < gradientStopsInfo.length; i += 1) {
      //^ Checking if color is a hex, if not returns false
      if (gradientStopsInfo[i][0].search(/(^#[0-9a-fA-F]{3}$)|(^#[0-9a-fA-F]{6}$)/gm) === -1)
        return false;
      //^ checking if percentage valid, if not returns false
      if (gradientStopsInfo[i][1].search(/^\d*%$/gm) === -1) {
        return false;
      }
    }
    return true;
  }

  public regexCut() {}
}

export { Styles, GradientToSVGFormat };
