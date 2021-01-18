import {
  CheckTheme,
  ColorOrGradient,
  PropertyDefiningKey,
  ThemeElementsToCode,
} from '../../api/StandartGraph/SG-Styles';
import Styles from '../../api/StandartGraph/SG-Styles';
import { themes } from '../../themes/SG-themes';

/*------------------------------------------------------------------------------------------*/

describe('CheckTheme tests', () => {
  test('Checking if matchTheme works correct', () => {
    const _CheckTheme = new CheckTheme();
    _CheckTheme.setSelectedTheme = 'default';
    const test = _CheckTheme.matchTheme();
    expect(test).toBe(themes.default);
  });

  test('Checking if matchTheme works correct with invalid theme name', () => {
    const _CheckTheme = new CheckTheme();
    _CheckTheme.setSelectedTheme = '__neverUseThisInProduction';
    const test = _CheckTheme.matchTheme();
    expect(test).toBe(themes.default);
  });

  test('Checking if isValidTheme works correct', () => {
    const _CheckTheme = new CheckTheme();
    _CheckTheme.setSelectedTheme = 'default';
    const test = _CheckTheme.isValidTheme();
    expect(test).toBe(true);
  });

  test('Checking if isValidTheme works correct with invalid theme name', () => {
    const _CheckTheme = new CheckTheme();
    _CheckTheme.setSelectedTheme = '__neverUseThisInProduction';
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
      const _PropertyDefiningKey = new PropertyDefiningKey('default');
      _PropertyDefiningKey.setElement = 'line';
      const test = _PropertyDefiningKey.getResult;
      expect(test).toBe(_PropertyDefiningKey.getElements.line);
    });

    test('Checking if chooseColorDefiningWord method returs valid info two times', () => {
      const _PropertyDefiningKey = new PropertyDefiningKey('default');
      _PropertyDefiningKey.setElement = 'line';
      let test = _PropertyDefiningKey.getResult;
      expect(test).toBe(_PropertyDefiningKey.getElements.line);

      _PropertyDefiningKey.setElement = 'background';
      test = _PropertyDefiningKey.getResult;
      expect(test).toBe(_PropertyDefiningKey.getElements.background);
    });
  });

  describe('Incorrect values', () => {
    test('Checking if getResutlt throws error if input data is invalid', () => {
      const _PropertyDefiningKey = new PropertyDefiningKey('default');
      _PropertyDefiningKey.setElement = '__neverUseThisInProduction';
      try {
        const test = _PropertyDefiningKey.getResult;
      } catch (err) {
        expect(err.message).toStrictEqual('Invalid property');
      }
    });
  });
});

/*------------------------------------------------------------------------------------------*/

/*------------------------------------------------------------------------------------------*/

describe('ThemeElementsToCode tests', () => {
  describe('Correct values', () => {
    test('Checking if method returns valid data from default theme', () => {
      const _ThemeElementsToCode = new ThemeElementsToCode('default');
      const test = _ThemeElementsToCode.getResult;

      expect(test).toStrictEqual({
        line: {
          element: '.grid',
          property: 'stroke',
          html: false,
          value: {
            css: expect.any(String),
          },
        },
        background: {
          element: 'svg',
          property: 'background',
          html: false,
          value: {
            css: expect.any(String),
          },
        },
        points: {
          element: '.points',
          property: 'fill',
          html: false,
          value: {
            css: expect.any(String),
          },
        },
        surface: {
          element: '.surfaces',
          property: 'fill',
          html: true,
          value: {
            css: expect.any(String),
          },
        },
      });
    });

    test('Checking if method returns valid data from greenGradient theme', () => {
      const _ThemeElementsToCode = new ThemeElementsToCode('greenGradient');
      const test = _ThemeElementsToCode.getResult;

      expect(test).toStrictEqual({
        line: {
          element: '.grid',
          property: 'stroke',
          html: false,
          value: {
            css: expect.any(String),
          },
        },
        background: {
          element: 'svg',
          property: 'background',
          html: false,
          value: {
            css: expect.any(String),
          },
        },
        points: {
          element: '.points',
          property: 'fill',
          html: false,
          value: {
            css: expect.any(String),
          },
        },
        surface: {
          element: '.surfaces',
          property: 'fill',
          html: true,
          value: {
            css: expect.any(String),
            html: expect.any(String),
          },
        },
      });
    });
  });

  describe('Incorrect values', () => {
    test('Checking if getResutlt throws error if input data is invalid', () => {
      const _ThemeElementsToCode = new ThemeElementsToCode('__neverUseThisInProduction');
      try {
        const test = _ThemeElementsToCode.getResult;
      } catch (err) {
        expect(err.message).toStrictEqual('Invalid property');
      }
    });
  });
});

/*------------------------------------------------------------------------------------------*/

/*------------------------------------------------------------------------------------------*/

describe('Styles tests', () => {
  describe('Correct values', () => {
    test('Checking if transform method returs valid info', () => {
      const _Styles = new Styles('default');
      const test = _Styles.transform();
      // console.log('Just CSS transform output:\n' + test);
      expect(test).toStrictEqual(expect.any(String));
    });

    test('Checking if transform method returs valid info', () => {
      const _Styles = new Styles('greenGradient');
      const test = _Styles.transform();
      // console.log('CSS + HTML transform output:\n' + test);
      expect(test).toStrictEqual(expect.any(String));
    });
  });

  describe('Incorrect values', () => {
    test('Checking if getResutlt throws error if input data is invalid', () => {
      const _Styles = new Styles('__neverUseThisInProduction');
      try {
        const test = _Styles.transform();
      } catch (err) {
        expect(err.message).toStrictEqual('Invalid property');
      }
    });
  });
});

/*------------------------------------------------------------------------------------------*/
