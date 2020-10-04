import { MultiStaticSelect } from '@slack/types';
import { FC, SelectElementProps } from '..';
import { buildInputOptions, InputOption } from './shared/inputOption';

export interface MultiSelectElementProps extends SelectElementProps {
  initialOptions?: InputOption[];
}

export const MultiSelectElement: FC<
  MultiSelectElementProps,
  MultiStaticSelect
> = ({ placeholder, actionId, options, initialOptions }) => ({
  type: 'multi_static_select',
  placeholder,
  action_id: actionId,
  options: buildInputOptions(options),
  initial_options: buildInputOptions(initialOptions),
});
