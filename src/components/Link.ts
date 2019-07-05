import { Span } from './Span';
import { ContainerProps } from './ContainerProps';
import { joinTextChildren } from './Text';

export interface LinkProps extends ContainerProps<string> {
  href: string;
}

export const Link: Span<LinkProps> = (props: LinkProps) => {
  return `<${props.href}|${joinTextChildren(props.children)}>`;
};
