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
  test('Gradient test with correct value', () => {
    let GTSF = new GradientToSVGFormat();
    expect(
      GTSF.isGradient(
        'linear-gradient(0deg, id="Gradient1", #e5afc4 0%, #d782a3 25%, #cd648d 50%, #c44677 75%, #9d325c 100%)',
      ),
    ).toBe(true);
  });
  describe('Incorrect values', () => {
    test('Gradient test with incorrect degrees', () => {
      let GTSF = new GradientToSVGFormat();
      expect(
        GTSF.isGradient(
          'linear-gradient(0d, Gradient1, #e5afc4 0%, #d782a3 25%, #cd648d 50%, #c44677 75%, #9d325c 100%)',
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

    test('Gradient test with incorrect value', () => {
      let GTSF = new GradientToSVGFormat();
      expect(
        GTSF.isGradient(
          'linear-gradient(0deg, Gradient1, #e5afc4 0%, #d782a3 25%, rgb(0,0,99) 4, #c44677 75%, #9c 1)',
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
