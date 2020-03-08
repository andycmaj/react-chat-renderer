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
    node: N,
    props: P,
    ...children: []
  ): Promise<JSX.Element> => {
    if (typeof node === 'function') {
      const resolvedPropArray = await Promise.all(
        Object.keys(props || {}).map(async propKey => {
          const prop = props[propKey];

          if (Array.isArray(prop)) {
            return [propKey, await Promise.all(prop)];
          } else if (typeof prop === 'function' || typeof prop === 'object') {
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
              if (Array.isArray(child)) {
                return await Promise.all(flattenDeep(child));
              } else if (
                typeof child === 'function' ||
                typeof child === 'object'
              ) {
                return await Promise.resolve(child);
              }

              return child;
            })
          )
        ).filter(child => !!child),
      });

      return typeof spec === 'string' || Array.isArray(spec)
        ? spec
        : pruneFields(spec);
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
