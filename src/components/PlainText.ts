import PropTypes from 'prop-types';
import Text from './Text';

// https://api.slack.com/reference/messaging/composition-objects#text
export default class PlainText extends Text {
  static propTypes = {
    children: PropTypes.element.isRequired,
    emoji: PropTypes.bool,
  };

  static defaultProps = {
    emoji: false,
  };

  constructor(root, props) {
    super(root, { ...PlainText.defaultProps, ...props }, 'plain_text');
  }

  renderText() {
    const { emoji } = this.props;
    return { emoji };
  }
}
