import {
  ImageElement as ImageElementSpec,
  UserElement as UserElementSpec,
  Button as ButtonSpec,
} from '@slack/types';
import { FC } from '.';

export type ActionType = 'button';

export type ActionSpec = ButtonSpec;

export type ElementType = 'image' | 'user' | ActionType;

export interface ElementProps<T extends ElementType> {
  type: T;
}

export type ElementSpec = ImageElementSpec | UserElementSpec | ActionSpec;

export type Element<
  P extends ElementProps<ElementType>,
  E extends ElementSpec
> = FC<P, E>;
