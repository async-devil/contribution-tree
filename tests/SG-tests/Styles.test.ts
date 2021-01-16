import {
  CheckTheme,
  ColorOrGradient,
  PropertyDefiningKey,
} from '../../api/StandartGraph/SG-Styles';
import { themes } from '../../themes/SG-themes';

/*------------------------------------------------------------------------------------------*/

describe('CheckTheme tests', () => {
  test('Checking if matchTheme works correct', () => {
    const _CheckTheme = new CheckTheme('default');
    const test = _CheckTheme.matchTheme();
    expect(test).toBe(themes.default);
  });

  test('Checking if matchTheme works correct with invalid theme name', () => {
    const _CheckTheme = new CheckTheme('__neverUseThisInProduction');
    const test = _CheckTheme.matchTheme();
    expect(test).toBe(themes.default);
  });

  test('Checking if isValidTheme works correct', () => {
    const _CheckTheme = new CheckTheme('default');
    const test = _CheckTheme.isValidTheme();
    expect(test).toBe(true);
  });

  test('Checking if isValidTheme works correct with invalid theme name', () => {
    const _CheckTheme = new CheckTheme('__neverUseThisInProduction');
    const test = _CheckTheme.isValidTheme();
    expect(test).toBe(false);
  });
});

/*------------------------------------------------------------------------------------------*/

/*------------------------------------------------------------------------------------------*/

describe('colorOrGradient tests', () => {
  describe('Correct values', () => {
    test('Checking if getResutlt returns color output', () => {
      const _ColorOrGradient = new ColorOrGradient('#123456');
      const test = _ColorOrGradient.getResult;
      expect(test).toStrictEqual({
        type: 'color',
        result: {
          css: '#123456',
        },
      });
    });

    test('Checking if getResutlt returns color output', () => {
      const _ColorOrGradient = new ColorOrGradient(
        'linear-gradient(0deg, id="Gradient1", #8ed7a5 0%, #63c783 25%, #3aa25b 50%, #30854b 75%, #26683b 100%)',
      );
      const test = _ColorOrGradient.getResult;
      expect(test).toStrictEqual({
        type: 'gradient',
        result: {
          css:
            'linear-gradient(0deg, #8ed7a5 0%, #63c783 25%, #3aa25b 50%, #30854b 75%, #26683b 100%)',
          svg: {
            css: 'fill: url(#Gradient1)',
            html: expect.any(String),
          },
        },
      });
    });
  });

  describe('Incorrect values', () => {
    test('Checking if getResutlt throws error if input data is invalid', () => {
      const _ColorOrGradient = new ColorOrGradient('__neverUseThisInProduction');
      try {
        const test = _ColorOrGradient.getResult;
      } catch (err) {
        expect(err.message).toStrictEqual('Invalid gradient data');
      }
    });
  });
});

/*------------------------------------------------------------------------------------------*/

/*------------------------------------------------------------------------------------------*/

describe('PropertyDefiningKey tests', () => {
  describe('Correct values', () => {
    test('Checking if chooseColorDefiningWord method returs valid info', () => {
      const _PropertyDefiningKey = new PropertyDefiningKey('default', 'line');
      const test = _PropertyDefiningKey.getResult;
      expect(test).toBe(_PropertyDefiningKey.getElements.line);
    });
  });

  describe('Incorrect values', () => {
    test('Checking if getResutlt throws error if input data is invalid', () => {
      const _PropertyDefiningKey = new PropertyDefiningKey('default', '__neverUseThisInProduction');
      try {
        const test = _PropertyDefiningKey.getResult;
      } catch (err) {
        expect(err.message).toStrictEqual('Invalid property');
      }
    });
  });
});

/*------------------------------------------------------------------------------------------*/
