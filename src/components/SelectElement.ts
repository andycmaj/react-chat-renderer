import { MultiStaticSelect, PlainTextElement } from '@slack/types';
import { FC } from '..';
import { AnyText } from './AnyText';

export interface SelectOption {
  text: ReturnType<AnyText>;
  value?: string;
  description?: PlainTextElement;
  url?: string;
}

export interface SelectElementProps {
  placeholder: PlainTextElement;
  actionId: string;
  options: SelectOption[];
}

export const SelectElement: FC<SelectElementProps, MultiStaticSelect> = ({
  placeholder,
  actionId,
  options,
}) => ({
  type: 'multi_static_select',
  placeholder,
  action_id: actionId,
  options,
});
