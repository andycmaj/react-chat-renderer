// https://api.slack.com/reference/messaging/composition-objects#text
export default class Text {
  constructor(root, props) {
    this.root = root;
    this.props = { ...Text.defaultProps, ...props };
  }

  appendChild(child) {
    throw new Error('Span should not have component children.');
  }

  render() {
    return '';
  }
}
