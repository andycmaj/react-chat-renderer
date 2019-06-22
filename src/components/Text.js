import PropTypes from 'prop-types';

// https://api.slack.com/reference/messaging/composition-objects#text
export default class Text {
  static propTypes = {
    children: PropTypes.element.isRequired,
  };

  constructor(root, props, type) {
    this.root = root;
    this.props = { ...Text.defaultProps, ...props, type };
  }

  appendChild(child) {
    throw new Error('Text should not have component children.');
  }

  renderText() {}

  render() {
    const { type, children: text } = this.props;
    return { type, text, ...this.renderText() };
  }
}
