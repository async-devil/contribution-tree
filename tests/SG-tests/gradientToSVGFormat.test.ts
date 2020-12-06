import GradientToSVGFormat from '../../api/StandartGraph/SG-GradientToSVG';

//! Important message:
//! I'm not a tester, so please don't criticise so much the way I tested
/*------------------------------------------------------------------------------------------*/

describe('IsGradient method tests', () => {
  describe('Correct values', () => {
    test('Gradient test with correct value', () => {
      const GTSF = new GradientToSVGFormat('mock');
      expect(
        GTSF.isGradient(
          'linear-gradient(0deg, id="Gradient1", #e5afc4 0%, #d782a3 25%, #cd648d 50%, #c44677 75%, #9d325c 100%)',
        ),
      ).toStrictEqual({ result: true });
    });

    test('Gradient test with correct value with 3 numbers hex', () => {
      const GTSF = new GradientToSVGFormat('mock');
      expect(
        GTSF.isGradient(
          'linear-gradient(0deg, id="Gradient1", #e5a 0%, #d78 25%, #cd6 50%, #c44 75%, #9d3 100%)',
        ),
      ).toStrictEqual({ result: true });
    });

    test('Gradient test without linear-gradient() prefix', () => {
      const GTSF = new GradientToSVGFormat('mock');
      expect(
        GTSF.isGradient(
          '0deg, id="Gradient1", #e5afc4 0%, #d782a3 25%, #cd648d 50%, #c44677 75%, #9d325c 100%',
        ),
      ).toStrictEqual({ result: true });
    });
  });

  describe('Incorrect values', () => {
    test('Gradient test with incorrect degrees', () => {
      const GTSF = new GradientToSVGFormat('mock');
      expect(
        GTSF.isGradient(
          'linear-gradient(0d, id="Gradient1", #e5afc4 0%, #d782a3 25%, #cd648d 50%, #c44677 75%, #9d325c 100%)',
        ),
      ).toStrictEqual({ result: false, error: 'Invalid degrees' });
    });

    test('Gradient test with incorrect id', () => {
      const GTSF = new GradientToSVGFormat('mock');
      expect(
        GTSF.isGradient(
          'linear-gradient(0deg, #e5afc4 0%, #d782a3 25%, #cd648d 50%, #c44677 75%, #9d325c 100%)',
        ),
      ).toStrictEqual({ result: false, error: 'Invalid ID' });
    });

    test('Gradient test with rgb', () => {
      const GTSF = new GradientToSVGFormat('mock');
      expect(
        GTSF.isGradient(
          'linear-gradient(0deg, id="Gradient1", #e5afc4 0%, #d782a3 25%, rgb(0,0,99) 50%, #c44677 75%, #9d325c 100%)',
        ),
      ).toStrictEqual({ result: false, error: 'Invalid color' });
    });

    test('Gradient test with incorrect percentage in stop info', () => {
      const GTSF = new GradientToSVGFormat('mock');
      expect(
        GTSF.isGradient(
          'linear-gradient(0deg, id="Gradient1", #e5afc4 0%, #d782a3 25, #cd648d 50%, #c44677 75%, #9d325c 100%)',
        ),
      ).toStrictEqual({ result: false, error: 'Invalid percentage' });
    });

    test('Gradient test with incorrect hex in stop info', () => {
      const GTSF = new GradientToSVGFormat('mock');
      expect(
        GTSF.isGradient(
          'linear-gradient(0deg, id="Gradient1", #e5afc4 0%, #d782 25%, #cd648d 50%, #c44677 75%, #9d325c 100%)',
        ),
      ).toStrictEqual({ result: false, error: 'Invalid color' });
    });

    test('Gradient test with non gradient info', () => {
      const GTSF = new GradientToSVGFormat('mock');
      expect(GTSF.isGradient('#e5afc4')).toStrictEqual({
        result: false,
        error: 'Invalid gradient data',
      });
    });

    test('Gradient test without stop point info', () => {
      const GTSF = new GradientToSVGFormat('mock');
      expect(GTSF.isGradient('linear-gradient(0deg, id="Gradient1")')).toStrictEqual({
        result: false,
        error: 'Invalid gradient data',
      });
    });

    test('Gradient test without linear-gradient prefix', () => {
      const GTSF = new GradientToSVGFormat('mock');
      expect(
        GTSF.isGradient(
          '(0deg, id="Gradient1", #e5afc4 0%, #d782a3 25%, #cd648d 50%, #c44677 75%, #9d325c 100%)',
        ),
      ).toStrictEqual({ result: false, error: 'Invalid degrees' });
    });
  });
});

/*------------------------------------------------------------------------------------------*/

/*------------------------------------------------------------------------------------------*/

describe('regExCut method tests', () => {
  describe('Correct values', () => {
    test('Cut test with correct value', () => {
      const GTSF = new GradientToSVGFormat('mock');
      expect(
        GTSF.regexCut(
          'linear-gradient(0deg, id="Gradient1", #e5afc4 0%, #d782a3 25%, #cd648d 50%, #c44677 75%, #9d325c 100%)',
        ),
      ).toStrictEqual({
        result: {
          degrees: '0deg',
          id: 'id="Gradient1"',
          points: [
            ['#e5afc4', '0%'],
            ['#d782a3', '25%'],
            ['#cd648d', '50%'],
            ['#c44677', '75%'],
            ['#9d325c', '100%'],
          ],
        },
      });
    });

    test('Cut test with correct value with 3 numbers hex', () => {
      const GTSF = new GradientToSVGFormat('mock');
      expect(
        GTSF.regexCut(
          'linear-gradient(0deg, id="Gradient1", #e5a 0%, #d78 25%, #cd6 50%, #c44 75%, #9d3 100%)',
        ),
      ).toStrictEqual({
        result: {
          degrees: '0deg',
          id: 'id="Gradient1"',
          points: [
            ['#e5a', '0%'],
            ['#d78', '25%'],
            ['#cd6', '50%'],
            ['#c44', '75%'],
            ['#9d3', '100%'],
          ],
        },
      });
    });

    test('Cut test without linear-gradient() prefix', () => {
      const GTSF = new GradientToSVGFormat('mock');
      expect(
        GTSF.regexCut(
          '0deg, id="Gradient1", #e5afc4 0%, #d782a3 25%, #cd648d 50%, #c44677 75%, #9d325c 100%',
        ),
      ).toStrictEqual({
        result: {
          degrees: '0deg',
          id: 'id="Gradient1"',
          points: [
            ['#e5afc4', '0%'],
            ['#d782a3', '25%'],
            ['#cd648d', '50%'],
            ['#c44677', '75%'],
            ['#9d325c', '100%'],
          ],
        },
      });
    });
  });

  describe('Incorrect values', () => {
    test('Cut test with incorrect degrees', () => {
      const GTSF = new GradientToSVGFormat('mock');
      expect(
        GTSF.regexCut(
          'linear-gradient(0d, id="Gradient1", #e5afc4 0%, #d782a3 25%, #cd648d 50%, #c44677 75%, #9d325c 100%)',
        ),
      ).toStrictEqual({ error: 'Invalid degrees' });
    });

    test('Cut test with incorrect id', () => {
      const GTSF = new GradientToSVGFormat('mock');
      expect(
        GTSF.regexCut(
          'linear-gradient(0deg, #e5afc4 0%, #d782a3 25%, #cd648d 50%, #c44677 75%, #9d325c 100%)',
        ),
      ).toStrictEqual({ error: 'Invalid ID' });
    });

    test('Cut test with rgb', () => {
      const GTSF = new GradientToSVGFormat('mock');
      expect(
        GTSF.regexCut(
          'linear-gradient(0deg, id="Gradient1", #e5afc4 0%, #d782a3 25%, rgb(0,0,99) 50%, #c44677 75%, #9d325c 100%)',
        ),
      ).toStrictEqual({ error: 'Invalid color' });
    });

    test('Cut test with incorrect percentage in stop info', () => {
      const GTSF = new GradientToSVGFormat('mock');
      expect(
        GTSF.regexCut(
          'linear-gradient(0deg, id="Gradient1", #e5afc4 0%, #d782a3 25, #cd648d 50%, #c44677 75%, #9d325c 100%)',
        ),
      ).toStrictEqual({ error: 'Invalid percentage' });
    });

    test('Cut test with incorrect hex in stop info', () => {
      const GTSF = new GradientToSVGFormat('mock');
      expect(
        GTSF.regexCut(
          'linear-gradient(0deg, id="Gradient1", #e5afc4 0%, #d782 25%, #cd648d 50%, #c44677 75%, #9d325c 100%)',
        ),
      ).toStrictEqual({ error: 'Invalid color' });
    });

    test('Cut test with non gradient info', () => {
      const GTSF = new GradientToSVGFormat('mock');
      expect(GTSF.regexCut('#e5afc4')).toStrictEqual({
        error: 'Invalid gradient data',
      });
    });

    test('Cut test without stop point info', () => {
      const GTSF = new GradientToSVGFormat('mock');
      expect(GTSF.regexCut('linear-gradient(0deg, id="Gradient1")')).toStrictEqual({
        error: 'Invalid gradient data',
      });
    });

    test('Cut test without linear-gradient prefix', () => {
      const GTSF = new GradientToSVGFormat('mock');
      expect(
        GTSF.regexCut(
          '(0deg, id="Gradient1", #e5afc4 0%, #d782a3 25%, #cd648d 50%, #c44677 75%, #9d325c 100%)',
        ),
      ).toStrictEqual({ error: 'Invalid degrees' });
    });
  });
});

/*------------------------------------------------------------------------------------------*/

/*------------------------------------------------------------------------------------------*/

describe('Construct method tests', () => {
  describe('Correct values', () => {
    test('Construct test with correct value', () => {
      const GTSF = new GradientToSVGFormat(
        'linear-gradient(0deg, id="Gradient1", #e5afc4 0%, #d782a3 25%, #cd648d 50%, #c44677 75%, #9d325c 100%)',
      );
      expect(GTSF.construct().result).toHaveProperty('html');
      expect(GTSF.construct().result).toHaveProperty('css');
    });

    test('Construct test with correct value with 3 numbers hex', () => {
      const GTSF = new GradientToSVGFormat(
        'linear-gradient(0deg, id="Gradient1", #e5a 0%, #d78 25%, #cd6 50%, #c44 75%, #9d3 100%)',
      );
      expect(GTSF.construct().result).toHaveProperty('html');
      expect(GTSF.construct().result).toHaveProperty('css');
    });

    test('Construct test without linear-gradient() prefix', () => {
      const GTSF = new GradientToSVGFormat(
        '0deg, id="Gradient1", #e5afc4 0%, #d782a3 25%, #cd648d 50%, #c44677 75%, #9d325c 100%',
      );
      expect(GTSF.construct().result).toHaveProperty('html');
      expect(GTSF.construct().result).toHaveProperty('css');
    });
  });

  describe('Incorrect values', () => {
    test('Construct test with incorrect degrees', () => {
      const GTSF = new GradientToSVGFormat(
        'linear-gradient(0d, id="Gradient1", #e5afc4 0%, #d782a3 25%, #cd648d 50%, #c44677 75%, #9d325c 100%)',
      );
      expect(GTSF.construct()).toStrictEqual({ error: 'Invalid degrees' });
    });

    test('Construct test with incorrect id', () => {
      const GTSF = new GradientToSVGFormat(
        'linear-gradient(0deg, #e5afc4 0%, #d782a3 25%, #cd648d 50%, #c44677 75%, #9d325c 100%)',
      );
      expect(GTSF.construct()).toStrictEqual({ error: 'Invalid ID' });
    });

    test('Construct test with rgb', () => {
      const GTSF = new GradientToSVGFormat(
        'linear-gradient(0deg, id="Gradient1", #e5afc4 0%, #d782a3 25%, rgb(0,0,99) 50%, #c44677 75%, #9d325c 100%)',
      );
      expect(GTSF.construct()).toStrictEqual({ error: 'Invalid color' });
    });

    test('Construct test with incorrect percentage in stop info', () => {
      const GTSF = new GradientToSVGFormat(
        'linear-gradient(0deg, id="Gradient1", #e5afc4 0%, #d782a3 25, #cd648d 50%, #c44677 75%, #9d325c 100%)',
      );
      expect(GTSF.construct()).toStrictEqual({ error: 'Invalid percentage' });
    });

    test('Construct test with incorrect hex in stop info', () => {
      const GTSF = new GradientToSVGFormat(
        'linear-gradient(0deg, id="Gradient1", #e5afc4 0%, #d782 25%, #cd648d 50%, #c44677 75%, #9d325c 100%)',
      );
      expect(GTSF.construct()).toStrictEqual({ error: 'Invalid color' });
    });

    test('Construct test with non gradient info', () => {
      const GTSF = new GradientToSVGFormat('#e5afc4');
      expect(GTSF.construct()).toStrictEqual({
        error: 'Invalid gradient data',
      });
    });

    test('Construct test without stop point info', () => {
      const GTSF = new GradientToSVGFormat('linear-gradient(0deg, id="Gradient1")');
      expect(GTSF.construct()).toStrictEqual({
        error: 'Invalid gradient data',
      });
    });

    test('Construct test without linear-gradient prefix', () => {
      const GTSF = new GradientToSVGFormat(
        '(0deg, id="Gradient1", #e5afc4 0%, #d782a3 25%, #cd648d 50%, #c44677 75%, #9d325c 100%)',
      );
      expect(GTSF.construct()).toStrictEqual({ error: 'Invalid degrees' });
    });
  });
});

/*------------------------------------------------------------------------------------------*/
