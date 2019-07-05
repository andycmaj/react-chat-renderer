import PropTypes from 'prop-types';
import Text from './Text';
import Span from './Span';
import { List } from 'immutable';

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

    this.buffer = new List();
  }

  appendChild(child) {
    if (child instanceof Span) {
      this.buffer = this.buffer.push(child.render());
    } else if (typeof child === 'string') {
      this.buffer = this.buffer.push(child);
    } else {
      throw new Error('Text should not have component children.');
    }
  }

  renderText() {
    const { verbatim } = this.props;
    return { verbatim, text: this.buffer.join('') };
  }
}
