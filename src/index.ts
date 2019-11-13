export type SlackSpec = {} | string;
export * from './components';

const pruneFields = <R>(o: {}): Partial<R> =>
  Object.keys(o).reduce(
    (obj, k) => (o[k] !== undefined ? { ...obj, [k]: o[k] } : obj),
    {}
  );

type Props<P> = { children?: unknown } & P;

export type FC<P extends {}, R> = (props: Props<P>) => R;

export namespace slack {
  export const h = <N extends FC<P, R>, P extends {}, R extends SlackSpec>(
    node: N,
    props: P,
    ...children: R[]
  ): JSX.Element => {
    if (typeof node === 'function') {
      const spec = node({
        ...props,
        children,
      });
      return typeof spec === 'string' ? spec : pruneFields(spec);
    }

    console.error('slack jsx', node, props, children);
    throw new Error('node not an FC');
  };

  export namespace JSX {
    export type Element = any;
    export interface ElementAttributesProperty {
      props: {};
    }
    export interface ElementChildrenAttribute {
      children: {};
    }
  }
}
