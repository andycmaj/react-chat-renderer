import { Map } from 'immutable';
import PropTypes from 'prop-types';

// https://api.slack.com/reference/messaging/payload
export default class Message {
  static propTypes = {
    // https://api.slack.com/messaging/interactivity/enabling#publishing_ephemeral_response
    responseType: PropTypes.oneOf(['ephemeral', 'in_channel']),
    asUser: PropTypes.bool,
    channel: PropTypes.string.isRequired,
    token: PropTypes.string.isRequired,
  };

  static defaultProps = {
    responseType: 'ephemeral',
    asUser: false,
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
    const {
      // eslint-disable-next-line camelcase
      asUser: as_user,
      // eslint-disable-next-line camelcase
      responseType: response_type,
      channel,
      token,
    } = this.props;

    return {
      response_type,
      channel,
      as_user,
      token,
      ...this.instance.toJS(),
    };
  }
}
