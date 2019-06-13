import { Map } from 'immutable';

// https://api.slack.com/reference/messaging/payload
export default class Message {
  constructor(root, props) {
    this.root = root;
    this.props = props;

    // https://api.slack.com/messaging/interactivity/enabling#publishing_ephemeral_response
    const { responseType = 'ephemeral' } = props;

    this.instance = new Map({
      response_type: responseType,
    });
  }

  appendChild(child) {
    console.log('message.appendChild', child);

    this.instance = this.instance.mergeDeep(child.render());
  }

  render() {
    console.log('message.render');

    return this.instance.toJS();
  }
}
