import { FC } from '..';
import { ImageElement as ImageElementSpec } from '@slack/types';
import { ElementProps, Element } from './Element';

export interface ImageElementProps extends ElementProps<'image'> {
  imageUrl: string;
  altText: string;
}

export const ImageElement: FC<ImageElementProps, ImageElementSpec> = ({
  imageUrl: image_url,
  altText: alt_text,
}) => ({
  type: 'image',
  image_url,
  alt_text,
});
