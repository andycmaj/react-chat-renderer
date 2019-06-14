import PropTypes from 'prop-types';
import BlockElement from './BlockElement';

// https://api.slack.com/reference/messaging/block-elements#image
export default class ImageElement extends BlockElement {
  static propTypes = {
    imageUrl: PropTypes.string.isRequired,
    altText: PropTypes.string.isRequired,
  };

  constructor(root, props, elementType) {
    super(root, props, 'image');
  }

  renderElement() {
    const { imageUrl: image_url, altText: alt_text } = this.props;
    return { image_url, alt_text };
  }
}
