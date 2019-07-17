interface Element {
  type: string;
}

export default abstract class BlockElement<P extends {}, T extends Element> {
  elementType: string;
  props: P;

  constructor(props, elementType) {
    this.props = props;
    this.elementType = elementType;
  }

  appendChild(child) {}

  // TODO: dynamic type that uses T but omits `type` (stuff in `Element`)
  abstract renderElement(): T;

  withType(element: {}): T {
    return { type: this.elementType, ...element };
  }

  render(): T {
    return this.renderElement();
  }
}
