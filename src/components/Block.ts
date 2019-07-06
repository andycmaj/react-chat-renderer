import { Block as SlackBlock } from '@slack/types';

export type BlockComponentProps = {
  blockId?: string;
};

export default class Block {
  root: any;
  props: BlockComponentProps;
  blockType: string;

  constructor(root, props: BlockComponentProps, blockType) {
    this.root = root;
    this.props = props;
    this.blockType = blockType;
  }

  appendChild(child) {}

  renderBlock(): {} {
    return {};
  }

  render() {
    const block: SlackBlock = {
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
