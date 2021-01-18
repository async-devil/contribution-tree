import { Data, Info } from './SG-Data';
import { Lines } from './SG-Lines';
import Styles from './SG-Styles';

class Constructor extends Data {
  constructor(data: Info) {
    super(data);
  }

  public construct() {
    const _Lines = new Lines(this.data);
    const _Styles = new Styles(this.data.choice);

    const buffer: string[] = [];
    buffer.push(this.svgStart(), _Lines.generate(), this.svgEnd);

    return buffer.join('\n');
  }
}

export { Constructor };
