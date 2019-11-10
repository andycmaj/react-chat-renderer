import { FC } from '..';
import {
  ImageElement as ImageElementSpec,
  UserElement as UserElementSpec,
  Button as ButtonSpec,
  Button,
  Overflow,
  Datepicker,
  Select,
  MultiSelect,
  Action,
} from '@slack/types';

export type ActionType = 'button';

export type ActionSpec = ButtonSpec;

export type ElementType = 'image' | 'user' | ActionType;

export type ElementProps<T extends ElementType> = {};

export type ElementSpec =
  | ImageElementSpec
  | UserElementSpec
  // | ActionSpec
  | Button
  | Overflow
  | Datepicker
  | Select
  | MultiSelect
  | Action;

export type BlockElement<
  P extends ElementProps<ElementType>,
  E extends ElementSpec
> = FC<P, E>;
