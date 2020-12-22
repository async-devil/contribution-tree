import { Styles } from '../../api/StandartGraph/SG-Styles';

/*------------------------------------------------------------------------------------------*/
describe('MatchTheme method tests', () => {
  describe('Correct values', () => {
    test('Checking if method founds sakuraGradient theme', () => {
      const Style = new Styles('sakuraGradient');
      expect(Style.matchTheme()).toStrictEqual({
        line: '#7a7a7a',
        background: '#ffffff',
        points: '#000000',
        surface:
          'linear-gradient(0deg, id="Gradient1", #e5afc4 0%, #d782a3 25%, #cd648d 50%, #c44677 75%, #9d325c 100%)',
      });
    });
    test('Checking if method founds blueGradient theme', () => {
      const Style = new Styles('blueGradient');
      expect(Style.matchTheme()).toStrictEqual({
        line: '#7a7a7a',
        background: '#ffffff',
        points: '#000000',
        surface:
          'linear-gradient(0deg, id="Gradient1", #66b5cb 0%, #3e9db8 25%, #34849b 50%, #2a6b7e 75%, #205261 100%)',
      });
    });
  });

  describe('Incorrect values', () => {
    test('Checking if method returns default theme', () => {
      const Style = new Styles('IncorrectData');
      expect(Style.matchTheme()).toStrictEqual({
        line: '#7a7a7a',
        background: '#ffffff',
        points: '#000000',
        surface: '#3aa25b',
      });
    });
  });
});
/*------------------------------------------------------------------------------------------*/

/*------------------------------------------------------------------------------------------*/
describe('ColorOrGradientParcer method tests', () => {
  describe('Correct values', () => {
    test('Checking if method returns valid 3 digital hex', () => {
      const Style = new Styles('');
      expect(Style.colorOrGradientParcer('#3a3')).toStrictEqual({
        result: {
          CSS: '#3a3',
        },
      });
    });
    test('Checking if method returns valid 6 digital hex', () => {
      const Style = new Styles('');
      expect(Style.colorOrGradientParcer('#ab4356')).toStrictEqual({
        result: {
          CSS: '#ab4356',
        },
      });
    });
    test('Checking if method returns valid gradient info', () => {
      const Style = new Styles('');
      const test = Style.colorOrGradientParcer(
        'linear-gradient(0deg, id="Gradient1", #e5afc4 0%, #d782a3 25%, #cd648d 50%, #c44677 75%, #9d325c 100%)',
      );
      expect(test).not.toHaveProperty('result.CSS', undefined);
      expect(test).not.toHaveProperty('result.SVG.CSS', undefined);
      expect(test).not.toHaveProperty('result.SVG.HTML', undefined);
    });
  });

  describe('Incorrect values', () => {
    test('Checking if method returns valid gradient info', () => {
      const Style = new Styles('');
      const test = Style.colorOrGradientParcer(
        'linear-gradient(0deg, id=Gradient1, #e5afc4 0%, #d782a3 25%, #cd648d 50%, #c44677 75%, #9d325c 100%)',
      );
      expect(test).not.toHaveProperty('error', undefined);
      expect(test).toHaveProperty('result', undefined);
    });
  });
});
/*------------------------------------------------------------------------------------------*/

/*------------------------------------------------------------------------------------------*/
describe('chooseColorDefiningWord tests', () => {
  describe('Correct values', () => {
    test('Checking if properties return their words', () => {
      const _Styles = new Styles('');
      const testParameters = expect.objectContaining({
        element: expect.any(String),
        property: expect.any(String),
        html: expect.any(Boolean),
      });

      expect(_Styles.chooseColorDefiningWord('line')).toEqual(testParameters);
      expect(_Styles.chooseColorDefiningWord('background')).toEqual(testParameters);
      expect(_Styles.chooseColorDefiningWord('points')).toEqual(testParameters);
      expect(_Styles.chooseColorDefiningWord('surface')).toEqual(testParameters);
    });
  });

  describe('Incorrect values', () => {
    test('Checking if method returns error because of invalid property', () => {
      const _Styles = new Styles('');
      const test = _Styles.chooseColorDefiningWord('onlyForTestingPurposes');

      expect(test).toEqual(
        expect.objectContaining({
          error: expect.any(String),
        }),
      );
    });
  });
});
/*------------------------------------------------------------------------------------------*/

/*------------------------------------------------------------------------------------------*/
describe('gettingInfoFromThemes tests', () => {
  describe('Correct values', () => {
    test('Checking if method returns valid information', () => {
      const _Styles = new Styles('blueGradient');
      const test = _Styles.gettingInfoFromThemes();
      const testParameters = expect.objectContaining({
        line: expect.objectContaining({ value: { result: { css: expect.any(String) } } }),
        background: expect.objectContaining({ value: { result: { css: expect.any(String) } } }),
        points: expect.objectContaining({ value: { result: { css: expect.any(String) } } }),
        surface: expect.objectContaining({ value: { result: expect.any(Object) } }),
      });

      expect(test).toEqual(testParameters);
    });
  });
});
/*------------------------------------------------------------------------------------------*/

/*------------------------------------------------------------------------------------------*/
describe('cssConstruct tests', () => {
  describe('Correct values', () => {
    test('Checking if method returns valid css code', () => {
      const _Styles = new Styles('');
      const test = _Styles.cssConstruct('.points', 'fill', '#000');
      expect(test).toEqual(expect.objectContaining({ result: { css: expect.any(String) } }));
    });
  });
});
/*------------------------------------------------------------------------------------------*/
