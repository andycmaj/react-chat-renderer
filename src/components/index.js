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

  if (constructors[type]) {
    return new constructors[type](root, props);
  }

  throw new Error(`Invalid element of type ${type} passed to PDF renderer`);
}
