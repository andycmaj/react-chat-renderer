import * as Slack from '@slack/types';
import { SlackComponent, SlackElement } from '../@types/index';

export interface BlockProps {
  blockId?: string;
}

type Block<P extends BlockProps, T> = P & { __blockType: T };
export default Block;

export abstract class BlockClass<B extends Slack.Block>
  implements SlackElement<BlockProps> {
  root: any;
  props: BlockProps;
  blockType: string;

  constructor(root: any, props: BlockProps, blockType: string) {
    this.root = root;
    this.props = props;
    this.blockType = blockType;
  }

  abstract appendChild(child) {}

  renderBlock(): B {}

  render(): { blocks: [B] } {
    const block = {
      type: this.blockType,
      ...this.renderBlock(),
    };

    if (this.props.blockId) {
      block.block_id = this.props.blockId;
    }

    // TODO: probably the parent Message should be responsible for
    // adding this block to an array it maintains, as opposed to
    // cheating and doing a deep merge... maybe?
    return {
      blocks: [block],
    };
  }
}
