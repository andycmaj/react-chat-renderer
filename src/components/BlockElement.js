export default class BlockElement {
  constructor(root, props, elementType) {
    this.root = root;
    this.props = props;
    this.elementType = elementType;
  }

  appendChild(child) {}

  renderElement() {}

  render() {
    return {
      type: this.elementType,
      ...this.renderElement(),
    };
  }
}
