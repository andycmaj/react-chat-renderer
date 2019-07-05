import { Map } from 'immutable';
import PropTypes from 'prop-types';

const Message = ({
  responseType = 'in_channel',
  asUser = false,
  channel,
  token,
  children,
}) => {
  let instance = new Map();

  if (Array.isArray(children)) {
    children.forEach(child => {
      instance = instance.mergeDeep(child.render());
    });
  } else {
    instance = instance.mergeDeep(children.render());
  }

  return {
    response_type: responseType,
    channel,
    as_user: asUser,
    token,
    ...instance.toJS(),
  };
};

Message.propTypes = {
  // https://api.slack.com/messaging/interactivity/enabling#publishing_ephemeral_response
  responseType: PropTypes.oneOf(['ephemeral', 'in_channel']),
  asUser: PropTypes.bool,
  channel: PropTypes.string.isRequired,
  token: PropTypes.string.isRequired,
};

export default Message;

// https://api.slack.com/reference/messaging/payload
// export default class Message {
//   static propTypes = {
//     // https://api.slack.com/messaging/interactivity/enabling#publishing_ephemeral_response
//     responseType: PropTypes.oneOf(['ephemeral', 'in_channel']),
//     asUser: PropTypes.bool,
//     channel: PropTypes.string.isRequired,
//     token: PropTypes.string.isRequired,
//   };

//   static defaultProps = {
//     responseType: 'in_channel',
//     asUser: false,
//   };

// constructor(root, props) {
//   this.root = root;
//   this.props = { ...Message.defaultProps, ...props };

//   this.instance = new Map();
// }

// appendChild(child) {
//   this.instance = this.instance.mergeDeep(child.render());
// }

//   render() {
//     const {
//       // eslint-disable-next-line camelcase
//       asUser: as_user,
//       // eslint-disable-next-line camelcase
//       responseType: response_type,
//       channel,
//       token,
//     } = this.props;

//     return {
//       response_type,
//       channel,
//       as_user,
//       token,
//       ...this.instance.toJS(),
//     };
//   }
// }
