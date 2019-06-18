import PropTypes from 'prop-types';
import Text from './Text';

// https://api.slack.com/reference/messaging/composition-objects#text
export default class MarkdownText extends Text {
  static propTypes = {
    children: PropTypes.element.isRequired,
    verbatim: PropTypes.bool,
  };

  static defaultProps = {
    verbatim: false,
  };

  constructor(root, props) {
    super(root, { ...MarkdownText.defaultProps, ...props }, 'mrkdwn');
  }

  renderText() {
    const { verbatim } = this.props;
    return { verbatim };
  }
}
