import { ImageElement as SlackImageElement } from '@slack/types';
import PropTypes from 'prop-types';
import BlockElement from './BlockElement';

interface ImageElementProps {
  imageUrl: string;
  altText?: string;
}

// https://api.slack.com/reference/messaging/block-elements#image
export default class ImageElement extends BlockElement<
  ImageElementProps,
  SlackImageElement
> {
  constructor(root, props, elementType) {
    super(props, 'image');
  }

  renderElement(): SlackImageElement {
    // eslint-disable-next-line camelcase
    const { imageUrl: image_url, altText: alt_text } = this.props;

    return this.withType({ image_url, alt_text });
  }
}
