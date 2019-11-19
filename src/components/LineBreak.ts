import { Span } from './Span';
import { Childless } from './Childless';

export const LineBreak: Span<Childless> = () => {
  return '\n';
};
