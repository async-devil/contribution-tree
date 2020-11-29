import { GradientToSVGFormat } from '../../api/StandartGraph/SG-Styles';

const correctValuesTestExpect: string = `
<linearGradient id="Gradient1" x1="0%" y1="100%" x2="0%" y2="0%">\n
<stop offset="0%" stop-color="#e5afc4">\n
<stop offset="25%" stop-color="#d782a3">\n
<stop offset="50%" stop-color="#cd648d">\n
<stop offset="75%" stop-color="#c44677">\n
<stop offset="100%" stop-color="#9d325c">\n
</linearGradient>
`;

describe('IsGradient method tests', () => {
  describe('Correct values', () => {
    test('Gradient test with correct value', () => {
      let GTSF = new GradientToSVGFormat();
      expect(
        GTSF.isGradient(
          'linear-gradient(0deg, id=Gradient1, #e5afc4 0%, #d782a3 25%, #cd648d 50%, #c44677 75%, #9d325c 100%)',
        ),
      ).toBe(true);
    });

    test('Gradient test with correct value with 3 numbers hex', () => {
      let GTSF = new GradientToSVGFormat();
      expect(
        GTSF.isGradient(
          'linear-gradient(0deg, id=Gradient1, #e5a 0%, #d78 25%, #cd6 50%, #c44 75%, #9d3 100%)',
        ),
      ).toBe(true);
    });

    test('Gradient test without linear-gradient() prefix', () => {
      let GTSF = new GradientToSVGFormat();
      expect(
        GTSF.isGradient(
          '0deg, id=Gradient1, #e5afc4 0%, #d782a3 25%, #cd648d 50%, #c44677 75%, #9d325c 100%',
        ),
      ).toBe(true);
    });
  });

  describe('Incorrect values', () => {
    test('Gradient test with incorrect degrees', () => {
      let GTSF = new GradientToSVGFormat();
      expect(
        GTSF.isGradient(
          'linear-gradient(0d, id=Gradient1, #e5afc4 0%, #d782a3 25%, #cd648d 50%, #c44677 75%, #9d325c 100%)',
        ),
      ).toBe(false);
    });

    test('Gradient test with incorrect id', () => {
      let GTSF = new GradientToSVGFormat();
      expect(
        GTSF.isGradient(
          'linear-gradient(0deg, #e5afc4 0%, #d782a3 25%, #cd648d 50%, #c44677 75%, #9d325c 100%)',
        ),
      ).toBe(false);
    });

    test('Gradient test with rgb', () => {
      let GTSF = new GradientToSVGFormat();
      expect(
        GTSF.isGradient(
          'linear-gradient(0deg, id=Gradient1, #e5afc4 0%, #d782a3 25%, rgb(0,0,99) 50%, #c44677 75%, #9d325c 100%)',
        ),
      ).toBe(false);
    });

    test('Gradient test with incorrect percentage in stop info', () => {
      let GTSF = new GradientToSVGFormat();
      expect(
        GTSF.isGradient(
          'linear-gradient(0deg, id=Gradient1, #e5afc4 0%, #d782a3 25, #cd648d 50%, #c44677 75%, #9d325c 100%)',
        ),
      ).toBe(false);
    });

    test('Gradient test with incorrect hex in stop info', () => {
      let GTSF = new GradientToSVGFormat();
      expect(
        GTSF.isGradient(
          'linear-gradient(0deg, id=Gradient1, #e5afc4 0%, #d782 25%, #cd648d 50%, #c44677 75%, #9d325c 100%)',
        ),
      ).toBe(false);
    });

    test('Gradient test with non gradient info', () => {
      let GTSF = new GradientToSVGFormat();
      expect(GTSF.isGradient('#e5afc4')).toBe(false);
    });

    test('Gradient test without stop point info', () => {
      let GTSF = new GradientToSVGFormat();
      expect(GTSF.isGradient('linear-gradient(0deg, id=Gradient1)')).toBe(false);
    });

    test('Gradient test without linear-gradient prefix', () => {
      let GTSF = new GradientToSVGFormat();
      expect(
        GTSF.isGradient(
          '(0deg, id=Gradient1, #e5afc4 0%, #d782a3 25%, #cd648d 50%, #c44677 75%, #9d325c 100%)',
        ),
      ).toBe(false);
    });
  });
});

// describe('Convert method tests', () => {
//   test('Gradient test with correct data', () => {
//     expect(GradientToSVGFormat.convert()).toBe(correctValuesTestExpect);
//   });
// });
