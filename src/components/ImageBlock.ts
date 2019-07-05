import PropTypes from 'prop-types';
import { Map } from 'immutable';

import Block from './Block';
import BlockElement from './BlockElement';
import Text from './Text';

export default class ImageBlock extends Block {
  static propTypes = {
    altText: PropTypes.string.isRequired,
    imageUrl: PropTypes.string.isRequired,
    title: PropTypes.string,
  };

  constructor(root, props) {
    super(root, props, 'image');

    this.instance = new Map();

    if (props.accessory) {
      this.appendChild(props.accessory);
    }
  }

  appendChild(child) {
    if (child instanceof BlockElement) {
      this.instance = this.instance.set('accessory', child.render());
    } else if (child instanceof Text) {
      this.instance = this.instance.set('text', child.render());
    } else {
      throw new Error(`child not supported yet: ${typeof child}`);
    }
  }

  renderBlock() {
    return this.instance.toJS();
  }
}

/*
{
  "type": "image",
  "title": {
    "type": "plain_text",
    "text": "image1",
    "emoji": true
  },
  "image_url": "https://api.slack.com/img/blocks/bkb_template_images/beagle.png",
  "alt_text": "image1"
},
*/
