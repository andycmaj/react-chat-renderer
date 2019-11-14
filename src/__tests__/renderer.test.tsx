/** @jsx slack.h */
import {
  slack,
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
} from '..';

describe('slack jsx', () => {
  it('message with complex fallback text', () => {
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
    expect(message).toMatchSnapshot();
  });

  it('message with simple fallback text', () => {
    const message = (
      <Message
        altText={<AltText mrkdwn={false}>simple message text</AltText>}
      ></Message>
    );
    expect(message).toMatchSnapshot();
  });

  it('component with single string child', () => {
    const message = <PlainText>fooooo</PlainText>;
    expect(message).toMatchSnapshot();
  });

  it('component with single nested component child', () => {
    const message = (
      <ContextBlock>
        <PlainText>fooooo</PlainText>
      </ContextBlock>
    );
    expect(message).toMatchSnapshot();
  });

  it('component with span array children', () => {
    const message = (
      <MarkdownText>
        link <Link href="https://google.com">hi google</Link>\n hi user{' '}
        <Mention userId="U12345" />
      </MarkdownText>
    );
    expect(message).toMatchSnapshot();
  });

  it('component with array of nested component children', () => {
    const message = (
      <Message token="test_token" channel="test_channel">
        <SectionBlock>
          <PlainText emoji>section text :sadkeanu:</PlainText>
        </SectionBlock>
        <DividerBlock />
        <SectionBlock blockId="section1">
          <MarkdownText>```code```</MarkdownText>
        </SectionBlock>
      </Message>
    );
    expect(message).toMatchSnapshot();
  });

  it('component with component props', () => {
    const message = (
      <SectionBlock
        fields={[
          <MarkdownText>**foo**: bar</MarkdownText>,
          <MarkdownText>**foo**: bar</MarkdownText>,
        ]}
        accessory={<ImageElement imageUrl="foo" altText="foo" />}
      >
        <MarkdownText>```code```</MarkdownText>
      </SectionBlock>
    );
    expect(message).toMatchSnapshot();
  });

  it('renders ActionsBlock elements as children', () => {
    expect(
      <ActionsBlock>
        <ButtonElement actionId="foo">Click</ButtonElement>
        <ImageElement
          imageUrl="https://api.slack.com/img/blocks/bkb_template_images/beagle.png"
          altText="alt"
        />
      </ActionsBlock>
    ).toMatchSnapshot();
  });

  it('renders Markdown with a ProgressBar', () => {
    expect(
      <MarkdownText>
        progress: <ProgressBar columnWidth={10} total={300} value={200} />
      </MarkdownText>
    ).toMatchObject({
      type: 'mrkdwn',
      text: 'progress: ▓▓▓▓▓▓▓░░░',
      verbatim: false,
    });
  });

  it('renders a Red ProgressBar', () => {
    expect(
      <MarkdownText>
        progress:{' '}
        <ProgressBar columnWidth={10} total={300} value={200} color="red" />
      </MarkdownText>
    ).toMatchObject({
      type: 'mrkdwn',
      text: 'progress: `▓▓▓▓▓▓▓░░░`',
      verbatim: false,
    });
  });

  it('renders a complex message', () => {
    const message = (
      <Message>
        <SectionBlock>
          <MarkdownText>
            Hey <Mention userId="foo" />
            Hot code review alert! :thermometer:
            <Link href="foo">some title</Link> has *{34} discussions*. You're
            missing out!
          </MarkdownText>
        </SectionBlock>
        <ActionsBlock>
          <ButtonElement actionId="view" style="primary">
            Get involved!
          </ButtonElement>
          <ButtonElement actionId="snooze">Snooze</ButtonElement>
          <ButtonElement actionId="mute" style="danger">
            Please stop!
          </ButtonElement>
        </ActionsBlock>
        <ContextBlock>
          <PlainText>This review has been open for N days.</PlainText>
        </ContextBlock>
      </Message>
    );
    expect(message).toMatchSnapshot();
  });

  // it('renders a Message with child expression', () => {
  //   const block = (
  //     <SectionBlock>
  //       <PlainText emoji>Hello, world</PlainText>
  //     </SectionBlock>
  //   );

  //   const out1 = SlackRenderer.render(
  //     <Message
  //       token="test_token"
  //       channel="test_channel"
  //       responseType="in_channel"
  //     >
  //       {block}
  //     </Message>
  //   );

  //   const out2 = SlackRenderer.render(
  //     <Message
  //       token="test_token"
  //       channel="test_channel"
  //       responseType="in_channel"
  //     >
  //       {block}
  //     </Message>
  //   );

  //   expect(out1).toEqual(out2);
  // });

  // it('renders contextblock children', () => {
  //   const message = SlackRenderer.render(
  //     <ContextBlock>
  //       <PlainText emoji>Hello, world</PlainText>
  //       <ImageElement
  //         imageUrl="https://api.slack.com/img/blocks/bkb_template_images/beagle.png"
  //         altText="alt"
  //       />
  //     </ContextBlock>
  //   );

  //   // console.log(JSON.stringify(message, null, 2));
  //   expect(message.blocks).toEqual([
  //     {
  //       elements: [
  //         {
  //           type: 'plain_text',
  //           text: 'Hello, world',
  //           emoji: true,
  //         },
  //         {
  //           type: 'image',
  //           image_url:
  //             'https://api.slack.com/img/blocks/bkb_template_images/beagle.png',
  //           alt_text: 'alt',
  //         },
  //       ],
  //       type: 'context',
  //     },
  //   ]);

  //   expect(message).toMatchSnapshot();
  // });
});
