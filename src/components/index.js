import Message from './Message';
import Root from './Root';
import DividerBlock from './DividerBlock';
import SectionBlock from './SectionBlock';
import ButtonElement from './ButtonElement';
import ImageElement from './ImageElement';
import PlainText from './PlainText';
import MarkdownText from './MarkdownText';
import ProgressBar from './ProgressBar';
import ContextBlock from './ContextBlock';

const constructors = {
  ROOT: Root,
  PLAIN_TEXT: PlainText,
  MARKDOWN_TEXT: MarkdownText,
  MESSAGE: Message,
  DIVIDER_BLOCK: DividerBlock,
  SECTION_BLOCK: SectionBlock,
  CONTEXT_BLOCK: ContextBlock,
  BUTTON_ELEMENT: ButtonElement,
  IMAGE_ELEMENT: ImageElement,
  PROGRESS_BAR: ProgressBar,
};

export function createInstance(element, root) {
  const { type, props = {} } = element;

  const instanceProps = {};

  // 3rd party react renderers don't support components as props,
  // so let's recursively check for any component-props we have
  // and manually replace the Element with an instance of the Component
  // class. Since we don't REALLY have to do any reconciling, this
  // shouldn't be a problem.
  for (let propName of Object.keys(props)) {
    if (propName === 'children') {
      continue;
    }

    let prop = props[propName];
    if (constructors[prop.type]) {
      instanceProps[propName] = createInstance(prop, root);
    }
  }

  if (constructors[type]) {
    return new constructors[type](root, { ...props, ...instanceProps });
  }

  throw new Error(`Invalid element of type ${type} passed to createInstance`);
}
