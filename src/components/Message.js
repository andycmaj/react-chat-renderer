import { Map } from 'immutable';
import PropTypes from 'prop-types';

// https://api.slack.com/reference/messaging/payload
export default class Message {
  static propTypes = {
    // https://api.slack.com/messaging/interactivity/enabling#publishing_ephemeral_response
    responseType: PropTypes.oneOf(['ephemeral', 'in_channel']),
  };

  static defaultProps = {
    responseType: 'ephemeral',
  };

  constructor(root, props) {
    this.root = root;
    this.props = { ...Message.defaultProps, ...props };

    this.instance = new Map();
  }

  appendChild(child) {
    this.instance = this.instance.mergeDeep(child.render());
  }

  render() {
    const { responseType: response_type } = this.props;

    return {
      response_type,
      ...this.instance.toJS(),
    };
  }
}
