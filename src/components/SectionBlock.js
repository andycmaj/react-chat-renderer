import PropTypes from 'prop-types';
import { Map } from 'immutable';

import Block from './Block';
import BlockElement from './BlockElement';
import Text from './Text';

export default class SectionBlock extends Block {
  static propTypes = {
    children: PropTypes.instanceOf(Text),
    fields: PropTypes.arrayOf(PropTypes.instanceOf(Text)),
    accessory: PropTypes.instanceOf(BlockElement),
  };

  constructor(root, props) {
    super(root, props, 'section');

    this.instance = new Map();
  }

  appendChild(child) {
    if (!(child instanceof Text)) {
      throw new Error('child not supported yet');
    }

    // TODO: validate singleton text (invariant?)

    this.instance = this.instance.set('text', child.render());
  }

  renderBlock() {
    return this.instance.toJS();
  }
}
