import { Constructor } from './SG-Constructor';
import { Data, Info } from './SG-Data';

class StandartGraph extends Constructor {
  /**
   * @param data Construction info about graph
   * @param choice Graph theme name
   * @param pointsPercentage Percentage of each point location number of values must be number of rows + 1
   */
  constructor(
    protected data: Info,
    protected choice: string,
    protected pointsPercentage: Array<number>,
  ) {
    super(data, choice, pointsPercentage);
  }

  /**
   * Getter which return SVG graph
   * @returns {string} SVG graph
   */
  public get getGradient(): string {
    return this.check();
  }

  private check(): string {
    let result: string;
    try {
      result = this.construct();
    } catch (err) {
      result = err.message;
    }

    return result;
  }
}

export { StandartGraph };
