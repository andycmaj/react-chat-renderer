export default class Block {
  constructor(root, props, blockType, blockId) {
    this.root = root;
    this.props = props;
    this.blockType = blockType;
    this.blockId = blockId;
  }

  appendChild(child) {
    console.log(`${this.blockType}.super.appendChild`, child);
  }

  renderBlock() {}

  render() {
    const block = {
      type: this.blockType,
      ...this.renderBlock(),
    };

    if (!!this.blockId) {
      block.block_id = this.blockId;
    }

    return {
      blocks: [block],
    };
  }
}
