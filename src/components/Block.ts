import { FC } from '.';
import { ContainerProps } from './ContainerProps';
import { KnownBlock } from '@slack/types';

type BlockType = 'image' | 'context' | 'divider' | 'actions' | 'section';

// TODO: more specific ContainerProps<T>
export interface BlockProps<T extends BlockType> {
  type: T;
  blockId?: string;
}

export type Block<P extends BlockProps<BlockType>, B extends KnownBlock> = FC<
  P,
  B
>;

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
