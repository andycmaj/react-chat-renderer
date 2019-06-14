import PropTypes from 'prop-types';

// https://api.slack.com/reference/messaging/composition-objects#text
export default class Text {
  static propTypes = {
    children: PropTypes.element.isRequired,
    type: PropTypes.oneOf(['mrkdwn', 'plain_text']),
    emoji: PropTypes.bool,
    verbatim: PropTypes.bool,
  };

  static defaultProps = {
    emoji: false,
    type: 'mrkdwn',
    verbatim: false,
  };

  constructor(root, props) {
    this.root = root;
    this.props = { ...Text.defaultProps, ...props };
  }

  appendChild(child) {
    throw new Error('Text should not have component children.');
  }

  render() {
    const { type, emoji, verbatim, children: text } = this.props;
    return { text: { type, emoji, verbatim, text } };
  }
}
