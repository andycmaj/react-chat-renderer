export default class Block {
  constructor(root, props, blockType) {
    this.root = root;
    this.props = props;
    this.blockType = blockType;
  }

  appendChild(child) {}

  renderBlock() {}

  render() {
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
