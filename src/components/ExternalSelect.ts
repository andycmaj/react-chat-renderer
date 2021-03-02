import { MultiExternalSelect } from '@slack/types';
import { FC, SelectElementProps } from '..';
import { buildInputOptions, InputOption } from './shared/inputOption';

export interface MultiExternalSelectElementProps extends SelectElementProps {
  initialOptions?: InputOption[];
}

export const MultiExternalSelectElement: FC<
  MultiExternalSelectElementProps,
  MultiExternalSelect
> = ({ placeholder, actionId, initialOptions }) => ({
  type: 'multi_external_select',
  placeholder,
  action_id: actionId,
  min_query_length: 0,
  initial_options: buildInputOptions(initialOptions),
});
