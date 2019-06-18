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
    super(
      root,
      // { ...props, children: [props.children, props.accessory] },
      props,
      'section'
    );

    this.instance = new Map();

    if (props.accessory) {
      this.appendChild(props.accessory);
    }
  }

  appendChild(child) {
    if (child instanceof BlockElement) {
      this.instance = this.instance.set('accessory', child.render());
    } else if (child instanceof Text) {
      this.instance = this.instance.set('text', child.render());
    } else {
      throw new Error(`child not supported yet: ${typeof child}`);
    }
  }

  renderBlock() {
    return this.instance.toJS();
  }
}
