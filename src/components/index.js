import Message from './Message';
import Text from './Text';
import Root from './Root';
import DividerBlock from './DividerBlock';
import SectionBlock from './SectionBlock';

const constructors = {
  ROOT: Root,
  TEXT: Text,
  MESSAGE: Message,
  DIVIDER_BLOCK: DividerBlock,
  SECTION_BLOCK: SectionBlock,
};

export function createInstance(element, root) {
  const { type, props = {} } = element;

  if (constructors[type]) {
    return new constructors[type](root, props);
  }

  throw new Error(`Invalid element of type ${type} passed to PDF renderer`);
}
