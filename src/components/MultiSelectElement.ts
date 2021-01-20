import { MultiStaticSelect } from '@slack/types';
import { FC, SelectElementProps } from '..';
import { buildInputOptions, InputOption } from './shared/inputOption';

export interface MultiSelectElementProps extends SelectElementProps {
  initialOptions?: InputOption[];
}

export const MultiSelectElement: FC<
  MultiSelectElementProps,
  MultiStaticSelect
> = ({ placeholder, actionId, options, optionGroups, initialOptions }) => ({
  type: 'multi_static_select',
  placeholder,
  action_id: actionId,
  ...(options && { options: buildInputOptions(options) }),
  ...(optionGroups && {
    option_groups: optionGroups.map(group => ({
      label: group.label,
      options: buildInputOptions(group.options),
    })),
  }),
  initial_options: buildInputOptions(initialOptions),
});
