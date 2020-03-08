/** @jsx slack.h */
/** @jsxFrag slack.Fragment */
import {
  slack,
  render,
  ActionsBlock,
  DividerBlock,
  ContextBlock,
  SectionBlock,
  ImageElement,
  ButtonElement,
  PlainText,
  MarkdownText,
  Link,
  Mention,
  ProgressBar,
  Message,
  AltText,
  LineBreak,
} from '..';

const fakePromise = async () => Promise.resolve();

describe('slack jsx', () => {
  it('message with complex fallback text', async () => {
    const message = (
      <Message
        altText={
          <AltText>
            Hey <Mention userId="foo" />
            progress:{' '}
            <ProgressBar columnWidth={10} total={300} value={200} color="red" />
          </AltText>
        }
      ></Message>
    );
    expect(await render(message)).toMatchSnapshot();
  });

  const DeltaIndicator = async ({ delta }: { delta: number }) => {
    await fakePromise();

    return delta > 0 ? (
      <ImageElement
        altText="improved"
        imageUrl="https://user-images.githubusercontent.com/97470/75739421-a7138180-5cb9-11ea-9547-e64acf86eb59.png"
      />
    ) : delta === 0 ? (
      'okay!'
    ) : (
      <ImageElement
        altText="declined"
        imageUrl="https://user-images.githubusercontent.com/97470/75739424-a7ac1800-5cb9-11ea-969a-e1ac9f12a41a.png"
      />
    );
  };

  it('renders contextblock with component children', async () => {
    const message = (
      <ContextBlock>
        <PlainText emoji>Hello, world</PlainText>
        <DeltaIndicator delta={-3} />
        <DeltaIndicator delta={0} />
      </ContextBlock>
    );

    expect(await render(message)).toMatchSnapshot();
  });

  it('renders contextblock children', async () => {
    const message = (
      <ContextBlock>
        <PlainText emoji>Hello, world</PlainText>
        <ImageElement
          imageUrl="https://api.slack.com/img/blocks/bkb_template_images/beagle.png"
          altText="alt"
        />
      </ContextBlock>
    );

    expect(await render(message)).toMatchSnapshot();
  });
});
