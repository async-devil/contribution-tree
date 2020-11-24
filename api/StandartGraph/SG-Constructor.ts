import { Lines, Info } from './SG-Lines';
import { Styles } from './SG-Styles';

class Constructor extends Lines {
  constructor(data: Info) {
    super(data);
  }

  public generate() {
    let buffer: string[] = [];
    // prettier-ignore
    buffer.push(
    this.svgStart(), 
    this.initX(), 
    this.initY(), 
    this.svgEnd);

    return buffer.join('\n');
  }
}

export { Constructor, Info };
