import PropTypes from 'prop-types';
import { Map, List } from 'immutable';

import Block from './Block';
import Text from './Text';
import ImageElement from './ImageElement';

// https://api.slack.com/reference/messaging/blocks#context
export default class ContextBlock extends Block {
  static propTypes = {
    // children: PropTypes.arrayOf([Text, ImageElement]),
  };

  constructor(root, props) {
    super(
      root,
      // { ...props, children: [props.children] },
      props,
      'context'
    );

    this.instance = new List();
  }

  appendChild(child) {
    if (child instanceof Text || child instanceof ImageElement) {
      this.instance = this.instance.push(child.render());
    } else {
      throw new Error(`child not supported yet: ${typeof child}`);
    }
  }

  renderBlock() {
    return this.instance.toJS();
  }
}
