import PropTypes from 'prop-types';

import Block from './Block';
import BlockElement from './BlockElement';

export default class ActionsBlock extends Block {
  static propTypes = {
    children: PropTypes.instanceOf(BlockElement),
  };

  constructor(root, props) {
    super(root, props, 'actions');

    this.elements = [];
  }

  appendChild(child) {
    if (child instanceof BlockElement) {
      this.elements.push(child.render());
    } else {
      throw new Error(`all children must be BlockElements: ${typeof child}`);
    }
  }

  renderBlock() {
    return { elements: this.elements };
  }
}
