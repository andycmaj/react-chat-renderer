import Span from './Span';

export default class Link extends Span {
  appendChild(child) {
    throw new Error('Text should not have component children.');
  }

  render() {
    return `<@${this.props.userId}>`;
  }
}
