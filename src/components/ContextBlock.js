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

    this.elements = [];
  }

  appendChild(child) {
    if (child instanceof Text || child instanceof ImageElement) {
      this.elements.push(child.render());
    } else {
      throw new Error(`child not supported yet: ${typeof child}`);
    }
  }

  renderBlock() {
    return { elements: this.elements };
  }
}
