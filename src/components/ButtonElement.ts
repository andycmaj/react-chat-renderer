import PropTypes from 'prop-types';
import BlockElement from './BlockElement';

// https://api.slack.com/reference/messaging/block-elements#button
export default class ButtonElement extends BlockElement {
  static propTypes = {
    children: PropTypes.string.isRequired,
    actionId: PropTypes.string.isRequired,
    url: PropTypes.string,
    value: PropTypes.string,
    style: PropTypes.oneOf(['primary', 'danger']),
    // confirm: PropTypes.instanceOf(ConfirmationDialog),
  };

  constructor(root, props, elementType) {
    super(root, props, 'button');
  }

  renderElement() {
    const {
      children: text,
      // eslint-disable-next-line camelcase
      actionId: action_id,
      url,
      value, // TODO: assume value is an object and JSON.serialize?
      style,
    } = this.props;
    return {
      text: {
        // plain_text only allowed in button text.
        type: 'plain_text',
        emoji: true,
        text,
      },
      action_id,
      url,
      value,
      style,
    };
  }
}
