import { Span } from './Span';
import { ContainerProps } from './ContainerProps';
import { joinTextChildren } from './Text';

// https://api.slack.com/reference/surfaces/formatting#escaping
const escape = (s: string) =>
  s.replace('&', '&amp;').replace('<', '&lt;').replace('>', '&gt;');

export interface LinkProps extends ContainerProps<string> {
  href: string;
}

export const Link: Span<LinkProps> = (props: LinkProps) => {
  return `<${props.href}|${escape(joinTextChildren(props.children))}>`;
};
