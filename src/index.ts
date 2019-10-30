export type SlackElement = {} | string;
export type FC<P extends {}, R extends SlackElement> = (props: P) => R;
export * from './components';

type Node<T> =
  | {
      node: T;
      props: any;
      children: Node<any> | Node<any>[];
    }
  | string;

export default <P extends { children: any }>(
  node: FC<P, any> | string,
  props: P | null,
  ...children: Node<any>[]
): Node<FC<P, any> | string> | null => {
  // console.log('pragma =====\n', node, '===\n', props, '===\n', children);
  if (typeof node === 'function') {
    return node({
      ...props,
      children,
    });
  }

  console.error('slack jsx', node, props, children);
  throw new Error('node not an FC');
};
