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
          'linear-gradient(0deg, id=Gradient1, #e5afc4 0%, #d782a3 25%, #cd648d 50%, #c44677 75%, #9d325c 100%)',
      });
    });
    test('Checking if method founds blueGradient theme', () => {
      const Style = new Styles('blueGradient');
      expect(Style.matchTheme()).toStrictEqual({
        line: '#7a7a7a',
        background: '#ffffff',
        points: '#000000',
        surface:
          'linear-gradient(0deg, id=Gradient1, #66b5cb 0%, #3e9db8 25%, #34849b 50%, #2a6b7e 75%, #205261 100%)',
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
      expect(
        Style.colorOrGradientParcer(
          'linear-gradient(0deg, id=Gradient1, #e5afc4 0%, #d782a3 25%, #cd648d 50%, #c44677 75%, #9d325c 100%)',
        ),
      ).toStrictEqual({
        result: {
          CSS:
            'linear-gradient(0deg, #e5afc4 0%, #d782a3 25%, #cd648d 50%, #c44677 75%, #9d325c 100%)',
          SVG: {
            CSS: '',
          },
        },
      });
    });
  });

  describe('Incorrect values', () => {});
});
/*------------------------------------------------------------------------------------------*/
