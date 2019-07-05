import Block from './Block';
import * as Slack from '@slack/types';

export default class DividerBlock extends Block<Slack.DividerBlock> {
  constructor(root, props) {
    super(root, props, 'divider');
  }
}
