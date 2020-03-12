import flattenDeep from 'lodash.flattendeep';
export type SlackSpec = {} | string;
export * from './components';

const pruneFields = <R>(o: {}): Partial<R> =>
  Object.keys(o).reduce(
    (obj, k) => (o[k] !== undefined ? { ...obj, [k]: o[k] } : obj),
    {}
  );

type Props<P> = { children?: unknown } & P;

export type FC<P extends {}, R extends any> = (props: Props<P>) => R;

// for now, this is a hack to help with typescript checking.
// if you wrap a top-level JSX element with `await render(<>)`,
// it's a better experience than just warpping with `await (<>)`.
// in the future, most of the promise awaiting should happen in
// render. h should just return the tree of JSX elements, and
// render should walk the tree and process/await/execute hooks,
// etc.
export const render = async (
  rootElement: Promise<slack.JSX.Element>
): Promise<any> => await rootElement;

export namespace slack {
  export const h = async (
    node: FC<{}, any>,
    props: Props<{}>,
    ...children: any[]
  ): Promise<JSX.Element> => {
    if (typeof node !== 'function') {
      throw new Error('node not an FC');
    }

    const resolvedPropArray = await Promise.all(
      Object.keys(props || {}).map(
        async (propKey): Promise<[string, any]> => {
          const prop = props[propKey];

          if (Array.isArray(prop)) {
            // console.log('ARRAY PROP', prop);
            return [propKey, await Promise.all(prop)];
          } else if (typeof prop === 'function' || typeof prop === 'object') {
            // console.log('FUNC/OBJ PROP', prop);
            return [propKey, await Promise.resolve(prop)];
          }

          // console.log('SCALAR PROP', prop);
          return [propKey, prop];
        }
      )
    );

    const resolvedProps: Record<string, any> = Object.fromEntries(
      resolvedPropArray
    );

    const spec = await node({
      ...resolvedProps,
      children: flattenDeep(
        await Promise.all(
          children.map(async child => {
            if (Array.isArray(child)) {
              // console.log('ARRAY CHILD', child);
              return await Promise.all(flattenDeep(child));
            } else if (
              typeof child === 'function' ||
              typeof child === 'object'
            ) {
              // console.log('FUNC/OBJ CHILD', child);
              return await Promise.resolve(child);
            }

            // console.log('SCALAR CHILD', child);

            return child;
          })
        )
      ).filter(child => !!child),
    });

    // console.log('SPEC', typeof spec, spec);
    return typeof spec === 'string' || Array.isArray(spec)
      ? spec
      : pruneFields(spec);
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
