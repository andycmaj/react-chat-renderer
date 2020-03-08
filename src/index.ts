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

export const render = async (
  rootElement: Promise<slack.JSX.Element>
): Promise<any> => await rootElement;

export namespace slack {
  export const h = async <N extends FC<P, any>, P extends {}>(
    node: N | { children: [] },
    props: P,
    ...children: []
  ): Promise<JSX.Element> => {
    if (typeof node === 'function') {
      const resolvedPropArray = await Promise.all(
        Object.keys(props || {}).map(async propKey => {
          const prop = props[propKey];

          if (typeof prop === 'function' || typeof prop === 'object') {
            return [propKey, await Promise.resolve(prop)];
          }

          return [propKey, prop];
        })
      );

      const resolvedProps = Object.fromEntries(resolvedPropArray) as any;

      const spec = await node({
        ...resolvedProps,
        children: flattenDeep(
          await Promise.all(
            children.map(async child => {
              if (typeof child === 'function' || typeof child === 'object') {
                return await Promise.resolve(child);
              }

              return child;
            })
          )
        ).filter(child => !!child),
      });

      return typeof spec === 'string'
        ? spec
        : Array.isArray(spec)
        ? spec
        : pruneFields(spec);
    } else if ('children' in node && Array.isArray(node.children)) {
      return flattenDeep(node.children).filter(child => !!child);
    }

    throw new Error('node not an FC');
  };

  export const Fragment = ({ children }): JSX.Element => {
    return children as JSX.Element;
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
