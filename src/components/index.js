import Message from './Message';
import Root from './Root';
import DividerBlock from './DividerBlock';
import SectionBlock from './SectionBlock';
import ButtonElement from './ButtonElement';
import ImageElement from './ImageElement';
import PlainText from './PlainText';
import MarkdownText from './MarkdownText';

const constructors = {
  ROOT: Root,
  PLAIN_TEXT: PlainText,
  MARKDOWN_TEXT: MarkdownText,
  MESSAGE: Message,
  DIVIDER_BLOCK: DividerBlock,
  SECTION_BLOCK: SectionBlock,
  BUTTON_ELEMENT: ButtonElement,
  IMAGE_ELEMENT: ImageElement,
};

export function createInstance(element, root) {
  const { type, props = {} } = element;

  const instanceProps = {};

  for (let propName of Object.keys(props)) {
    if (propName === 'children') {
      continue;
    }

    let prop = props[propName];
    if (constructors[prop.type]) {
      instanceProps[propName] = new constructors[prop.type](root, prop.props);
    }
  }

  if (constructors[type]) {
    return new constructors[type](root, { ...props, ...instanceProps });
  }

  throw new Error(`Invalid element of type ${type} passed to createInstance`);
}
