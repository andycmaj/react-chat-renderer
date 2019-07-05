import { Block, BlockProps } from './Block';
import { ImageBlock as ImageBlockSpec } from '@slack/types';
import { ContainerProps } from './ContainerProps';
import { AnyText } from './AnyText';
import { ImageElement } from './ImageElement';
import { Childless } from './Childless';

export interface ImageBlockProps extends BlockProps<'image'>, Childless {
  altText: string;
  imageUrl: string;
  title?: string;
}

export const ImageBlock: Block<ImageBlockProps, ImageBlockSpec> = ({
  blockId,
  imageUrl,
  altText,
  title,
}) => ({
  type: 'image',
  block_id: blockId,
  image_url: imageUrl,
  alt_text: altText,
  title: {
    type: 'plain_text',
    text: title,
    emoji: true,
  },
});
