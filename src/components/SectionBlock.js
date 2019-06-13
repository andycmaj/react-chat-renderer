import Block from './Block';
import Text from './Text';
import { Map } from 'immutable';

export default class SectionBlock extends Block {
  constructor(root, props) {
    super(root, props, 'section');

    this.instance = new Map();
  }

  appendChild(child) {
    console.log(`${this.blockType}.super.appendChild`, child);

    if (child instanceof Text) {
      this.instance = this.instance.set('text', child.render());
    } else {
      throw new Error('child not supported yet');
    }
  }

  renderBlock() {
    return this.instance.toJS();
  }
}
