/** @jsx slack */
import slack, {
  DividerBlock,
  ContextBlock,
  PlainText,
  MarkdownText,
  Link,
  Mention,
} from '..';

describe('renderer', () => {
  it('renders a Message with Hello, world text', () => {
    const message = (
      <ContextBlock>
        <PlainText>fooooo</PlainText>
      </ContextBlock>
    );
    expect(message).toMatchObject({
      type: 'context',
      elements: [
        {
          type: 'plain_text',
          text: 'fooooo',
          emoji: false,
        },
      ],
    });
  });

  it('renders Markdown with links and user references', () => {
    const message = (
      <MarkdownText>
        link <Link href="https://google.com">hi google</Link>\n hi user{' '}
        <Mention userId="U12345" />
      </MarkdownText>
    );
    expect(message).toMatchObject({
      type: 'mrkdwn',
      text: 'link <https://google.com|hi google>\\n hi user <@U12345>',
      emoji: false,
    });
  });

  // it('renders a Message with an array of Blocks', () => {
  //   expect(
  //     SlackRenderer.render(
  //       <Message token="test_token" channel="test_channel">
  //         <SectionBlock
  //           accessory={<ButtonElement actionId="doAThing">Go!</ButtonElement>}
  //         >
  //           <PlainText emoji>section text :sadkeanu:</PlainText>
  //         </SectionBlock>
  //         <DividerBlock />
  //         <SectionBlock blockId="section1">
  //           <MarkdownText>```code```</MarkdownText>
  //         </SectionBlock>
  //       </Message>
  //     )
  //   ).toMatchSnapshot();
  // });

  // it('renders a Block component without a parent Message', () => {
  //   expect(
  //     SlackRenderer.render(
  //       <SectionBlock blockId="section1">
  //         <PlainText emoji>section ```code```</PlainText>
  //       </SectionBlock>
  //     )
  //   ).toMatchSnapshot();
  // });

  // it('renders ActionsBlock elements as children', () => {
  //   expect(
  //     SlackRenderer.render(
  //       <ActionsBlock>
  //         <ButtonElement actionId="foo">Click</ButtonElement>
  //         <ImageElement
  //           imageUrl="https://api.slack.com/img/blocks/bkb_template_images/beagle.png"
  //           altText="alt"
  //         />
  //       </ActionsBlock>
  //     )
  //   ).toMatchSnapshot();
  // });

  // it('renders a ButtonElement', () => {
  //   expect(
  //     SlackRenderer.render(
  //       <ButtonElement actionId="doAThing">Go!</ButtonElement>
  //     )
  //   ).toMatchSnapshot();
  // });

  // it('renders Markdown with a ProgressBar', () => {
  //   expect(
  //     SlackRenderer.render(
  //       <MarkdownText>
  //         progress: <ProgressBar columnWidth="10" total="300" value="200" />
  //       </MarkdownText>
  //     )
  //   ).toEqual({
  //     type: 'mrkdwn',
  //     text: 'progress: ▓▓▓▓▓▓▓░░░',
  //     verbatim: false,
  //   });
  // });

  // it('renders a Red ProgressBar', () => {
  //   expect(
  //     SlackRenderer.render(
  //       <MarkdownText>
  //         progress:{' '}
  //         <ProgressBar columnWidth="10" total="300" value="200" color="red" />
  //       </MarkdownText>
  //     )
  //   ).toEqual({
  //     type: 'mrkdwn',
  //     text: 'progress: `▓▓▓▓▓▓▓░░░`',
  //     verbatim: false,
  //   });
  // });

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
