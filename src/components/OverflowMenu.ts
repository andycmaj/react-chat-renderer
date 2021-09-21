import { StaticSelect, Overflow } from '@slack/types';
import { FC } from '..';
import { buildInputOptions, InputOption } from './shared/inputOption';

export interface OverflowMenuProps {
  actionId: string;
  options: InputOption[];
}

export const OverflowMenu: FC<OverflowMenuProps, Overflow> = ({
  actionId,
  options,
}) => ({
  type: 'overflow',
  action_id: actionId,
  ...(options && { options: buildInputOptions(options) }),
});
