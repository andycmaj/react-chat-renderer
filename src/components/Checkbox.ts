import { Checkboxes } from '@slack/types';
import { FC } from '..';
import { buildInputOptions, InputOption } from './shared/inputOption';

export interface CheckboxElementProps {
  initialOptions?: InputOption[];
  actionId: string;
  confirm?: boolean;
  options: InputOption[];
}

export const CheckboxElement: FC<CheckboxElementProps, Checkboxes> = ({
  initialOptions,
  actionId,
  options,
}) => ({
  type: 'checkboxes',
  action_id: actionId,
  options: buildInputOptions(options),
  initial_options: buildInputOptions(initialOptions),
});
