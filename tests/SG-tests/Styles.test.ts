import { CheckTheme } from '../../api/StandartGraph/SG-Styles';
import { themes } from '../../themes/SG-themes';

/*------------------------------------------------------------------------------------------*/

describe('CheckTheme tests', () => {
  test('Checking if matchTheme works correct', () => {
    const _CheckTheme = new CheckTheme('default', true);
    const test = _CheckTheme.matchTheme();
    expect(test).toBe(themes.default);
  });

  test('Checking if matchTheme works correct with invalid theme name', () => {
    const _CheckTheme = new CheckTheme('__neverUseThisNameInProduction', true);
    const test = _CheckTheme.matchTheme();
    expect(test).toBe(themes.default);
  });

  test('Checking if isValidTheme works correct', () => {
    const _CheckTheme = new CheckTheme('default', true);
    const test = _CheckTheme.isValidTheme();
    expect(test).toBe(true);
  });

  test('Checking if isValidTheme works correct with invalid theme name', () => {
    const _CheckTheme = new CheckTheme('__neverUseThisNameInProduction', true);
    const test = _CheckTheme.isValidTheme();
    expect(test).toBe(false);
  });
});

/*------------------------------------------------------------------------------------------*/
