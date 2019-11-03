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

const pruneFields = (o: {}) =>
  Object.keys(o).reduce(
    (obj, k) => (o[k] !== undefined ? { ...obj, [k]: o[k] } : obj),
    {}
  );

// export namespace JSX {
//   // @ts-ignore
//   interface Element extends Node {}
//   export interface ElementAttributesProperty {
//     props: {};
//   }
//   export interface ElementChildrenAttribute {
//     children: {};
//   }
// }

export default <P extends { children: any }>(
  node: FC<P, any> | string,
  props: P | null,
  ...children: Node<any>[]
) => {
  // console.log('node', node);
  // console.log('children', children);
  if (typeof node === 'function') {
    const spec = node({
      ...props,
      children,
    });
    // console.log('spec', spec);
    return typeof spec === 'string' ? spec : pruneFields(spec);
  }

  console.error('slack jsx', node, props, children);
  throw new Error('node not an FC');
};
