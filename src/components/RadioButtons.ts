import { RadioButtons } from '@slack/types';
import { FC } from '..';
import { buildInputOptions, InputOption } from './shared/inputOption';

export interface RadioButtonsElementProps {
  initialOption?: InputOption;
  actionId: string;
  options: InputOption[];
}

export const RadioButtonsElement: FC<
  RadioButtonsElementProps,
  RadioButtons
> = ({ initialOption, actionId, options }) => ({
  type: 'radio_buttons',
  action_id: actionId,
  options: buildInputOptions(options),
  initial_option: buildInputOptions([initialOption])[0],
});
