import { Data, Info } from './SG-Data';
import { Lines } from './SG-Lines';
import { Points, Surface } from './SG-PointsAndSurface';
import Styles from './SG-Styles';

class Constructor extends Data {
  /**
   *
   * @param data Construction info about graph
   * @param choice Graph theme name
   * @param pointsPercentage Percentage of each point location number of values must be number of rows + 1
   */
  constructor(
    protected data: Info,
    protected choice: string,
    protected pointsPercentage: Array<number>,
  ) {
    super(data);
  }

  /**
   * Method which constructs all up
   * @returns {string} SVG graph
   */
  public construct() {
    const _Lines = new Lines(this.data);
    const _Styles = new Styles(this.choice);
    const _Points = new Points(this.data, this.pointsPercentage);
    const _Surface = new Surface(this.data, this.pointsPercentage);

    const buffer: string[] = [];
    buffer.push(
      this.svgStart(),
      _Lines.generate(),
      _Surface.getSurface,
      _Points.getPoints,
      _Styles.transform(),
      this.svgEnd,
    );

    return buffer.join('\n');
  }
}

export { Constructor };
