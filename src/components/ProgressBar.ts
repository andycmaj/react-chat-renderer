import { Span } from './Span';

const COMPLETED_CHAR = '▓';
const INCOMPLETE_CHAR = '░';

interface ProgressBarProps {
  value: number;
  total: number;
  color?: 'red' | 'black';
  columnWidth?: number;
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
