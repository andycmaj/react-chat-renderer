import { Block, BlockProps } from './Block';
import { ContainerProps } from './ContainerProps';
import { PlainText } from './PlainText';

export interface HeaderBlockProps
  extends BlockProps,
    ContainerProps<typeof PlainText> {}

export interface HeaderBlockSpec {
  type: 'header';
  text: ReturnType<typeof PlainText>;
}

export const HeaderBlock: Block<HeaderBlockProps, HeaderBlockSpec> = ({
  children,
  blockId,
}) => ({
  type: 'header',
  block_id: blockId,
  text: [].concat(children)[0],
});
