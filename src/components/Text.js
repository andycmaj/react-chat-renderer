// https://api.slack.com/reference/messaging/composition-objects#text
export default class Text {
  constructor(root, props) {
    this.root = root;
    this.props = props;
  }

  appendChild(child) {
    console.log('text.appendChild', child);
    throw new Error('Text should not have component children.');
  }

  render() {
    return { text: this.props.children };
  }
}
