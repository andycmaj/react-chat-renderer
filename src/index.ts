export type SlackSpec = {} | string;
export * from './components';

const pruneFields = <R>(o: {}): Partial<R> =>
  Object.keys(o).reduce(
    (obj, k) => (o[k] !== undefined ? { ...obj, [k]: o[k] } : obj),
    {}
  );

type Props<P> = { children?: unknown } & P;

export type FC<P extends {}, R extends SlackSpec> = (props: Props<P>) => R;

export namespace JSX {
  export type Element = SlackSpec | FC<any, any>;
  export interface ElementAttributesProperty {
    props: {};
  }
  export interface ElementChildrenAttribute {
    children: {};
  }
}

export const slack = <N extends FC<P, R>, P extends {}, R extends SlackSpec>(
  node: N,
  props: P,
  ...children: N[]
): JSX.Element => {
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
