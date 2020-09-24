import flattenDeep from 'lodash.flattendeep';
export type SlackSpec = {} | string;

const pruneFields = <R>(o: {}): Partial<R> =>
  Object.keys(o).reduce(
    (obj, k) => (o[k] !== undefined ? { ...obj, [k]: o[k] } : obj),
    {}
  );

type Props<P> = { children?: unknown } & P;

export type FC<P extends {}, R extends any> = (props: Props<P>) => R;

const resolveDeep = async (thing: any) => {
  if (!thing) {
    return thing;
  } else if (Array.isArray(thing)) {
    return await Promise.all(thing.map(item => resolveDeep(item)));
  } else if (thing.__proto__ === Promise.prototype) {
    return await Promise.resolve(thing);
  } else if (typeof thing === 'object') {
    const resolvedPairs = await Promise.all(
      Object.keys(thing).map(async key => [key, await resolveDeep(thing[key])])
    );
    return Object.fromEntries(resolvedPairs);
  } else if (typeof thing === 'function') {
    return await Promise.resolve(thing);
  } else {
    return thing;
  }
};

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

    const resolvedProps = await resolveDeep(props || {});

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

export * from './components';
export { renderMarkdown } from './renderMarkdown';
