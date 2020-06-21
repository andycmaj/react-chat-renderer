import { FC } from '..';
import {
  ImageElement as ImageElementSpec,
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

export type ElementSpec =
  | ImageElementSpec
  // | ActionSpec
  | Button
  | Overflow
  | Datepicker
  | Select
  | MultiSelect
  | Action;

export type BlockElement<P extends {}, E extends ElementSpec> = FC<P, E>;
