// https://api.slack.com/reference/messaging/composition-objects#text
export default class Span {
  static propTypes = {};

  constructor(root, props) {
    this.root = root;
    this.props = { ...Span.defaultProps, ...props };
  }

  appendChild(child) {
    throw new Error('Span should not have component children.');
  }

  render() {
    return '';
  }
}
