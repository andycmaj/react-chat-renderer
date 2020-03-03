import flattenDeep from 'lodash.flattendeep';
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
    node: N | { children: [] },
    props: P,
    ...children: R[]
  ): JSX.Element => {
    if (typeof node === 'function') {
      const spec = node({
        ...props,
        children: flattenDeep(children).filter(child => !!child),
      });
      return typeof spec === 'string' ? spec : pruneFields(spec);
    } else if ('children' in node && Array.isArray(node.children)) {
      return node.children;
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
