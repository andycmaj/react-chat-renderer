import { StaticSelect, Overflow } from '@slack/types';
import { FC } from '..';
import { buildInputOptions, InputOption } from './shared/inputOption';

export interface OverflowMenuElementProps {
  actionId: string;
  options: InputOption[];
}

export const OverflowMenuElement: FC<OverflowMenuElementProps, Overflow> = ({
  actionId,
  options,
}) => ({
  type: 'overflow',
  action_id: actionId,
  ...(options && { options: buildInputOptions(options) }),
});
