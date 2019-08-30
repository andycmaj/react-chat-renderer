import PropTypes from 'prop-types';
import Span from './Span';

export default class Link extends Span {
  static propTypes = {
    children: PropTypes.element.isRequired,
  };

  appendChild(child) {
    throw new Error('Text should not have component children.');
  }

  render() {
    return `<${this.props.href}|${this.props.children}>`;
  }
}
