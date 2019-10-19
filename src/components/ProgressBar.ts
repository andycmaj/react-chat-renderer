import { Span } from './Span';
import { Childless } from './Childless';

const COMPLETED_CHAR = '▓';
const INCOMPLETE_CHAR = '░';

interface ProgressBarProps extends Childless {
  color: 'red' | 'black';
  total: number;
  value: number;
  columnWidth: number;
}

export const ProgressBar: Span<ProgressBarProps> = ({
  value,
  total,
  color = 'black',
  columnWidth = 5,
}) => {
  const completedCount = Math.ceil((value / total) * columnWidth);
  const incompleteCount = columnWidth - completedCount;
  const segments =
    COMPLETED_CHAR.repeat(completedCount) +
    INCOMPLETE_CHAR.repeat(incompleteCount);

  return color === 'red' ? `\`${segments}\`` : segments;
};
