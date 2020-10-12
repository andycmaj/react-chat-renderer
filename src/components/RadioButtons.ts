import { RadioButtons } from '@slack/types';
import { FC } from '..';
import { buildInputOptions, InputOption } from './shared/inputOption';

export interface RadioButtonsElementProps {
  initialOptions?: InputOption[];
  actionId: string;
  confirm?: boolean;
  options: InputOption[];
}

export const RadioButtonsElement: FC<
  RadioButtonsElementProps,
  RadioButtons
> = ({ initialOptions, actionId, options }) => ({
  type: 'radio_buttons',
  action_id: actionId,
  options: buildInputOptions(options),
  initial_options: buildInputOptions(initialOptions),
});
