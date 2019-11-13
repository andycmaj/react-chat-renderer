import { Span } from './Span';

export interface MentionProps {
  userId: string;
}

export const Mention: Span<MentionProps> = ({ userId }) => `<@${userId}>`;
