import { ImageElement as ImageElementSpec } from '@slack/types';
import { ElementProps, Element } from './Element';
import { Childless } from './Childless';

export interface ImageElementProps extends ElementProps<'image'>, Childless {
  imageUrl: string;
  altText: string;
}

export const ImageElement: Element<ImageElementProps, ImageElementSpec> = ({
  type,
  imageUrl: image_url,
  altText: alt_text,
}) => ({
  type,
  image_url,
  alt_text,
});
