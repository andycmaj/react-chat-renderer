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

  it('message with simple fallback text', async () => {
    const message = (
      <Message
        altText={<AltText mrkdwn={false}>simple message text</AltText>}
      ></Message>
    );
    expect(await render(message)).toMatchSnapshot();
  });

  it('component with single string child', async () => {
    const message = <PlainText>fooooo</PlainText>;
    expect(await render(message)).toMatchSnapshot();
  });

  it('can render simple fragments', async () => {
    const CustomBlock = async () => Promise.resolve(<DividerBlock />);

    const message = (
      <Message altText={<AltText>My weekly summary</AltText>}>
        <>
          <DividerBlock />
          <CustomBlock />
          <DividerBlock />
        </>
      </Message>
    );

    expect(await render(message)).toMatchSnapshot();
  });

  it('can ignore falsy children', async () => {
    const CustomBlock = async () =>
      Promise.resolve(
        <>
          <DividerBlock />
          {false}
        </>
      );

    const message = (
      <Message altText={<AltText>My weekly summary</AltText>}>
        <DividerBlock />
        {null}
        <>
          <CustomBlock />
          {false}
          <DividerBlock />
        </>
        {undefined}
      </Message>
    );

    expect(await render(message)).toMatchSnapshot();
  });

  it('can render nested fragments in maps', async () => {
    const userMotivations = [
      {
        motivation: {
          name: 'm1',
          motivationHabits: [
            {
              habit: {
                name: 'h1',
                userHabits: [
                  {
                    habit: {
                      name: 'uh1',
                    },
                  },
                  {
                    habit: { name: 'uh2' },
                  },
                ],
              },
            },
            {
              habit: {
                name: 'h2',
                userHabits: [
                  {
                    habit: { name: 'uh3' },
                  },
                  {
                    habit: { name: 'uh4' },
                  },
                ],
              },
            },
          ],
        },
      },
    ];

    const msg = (
      <Message altText={<AltText>My weekly summary</AltText>}>
        <DividerBlock />
        <SectionBlock>
          <MarkdownText>My growth this week</MarkdownText>
        </SectionBlock>
        <DividerBlock />
        {userMotivations.map(({ motivation: { name, motivationHabits } }) =>
          motivationHabits.map(({ habit: { userHabits } }) =>
            userHabits.map(({ habit: { name: habitName } }) => (
              <>
                <SectionBlock>
                  <MarkdownText>
                    *{name}: {habitName}*
                  </MarkdownText>
                </SectionBlock>
                <ContextBlock>
                  <ImageElement
                    altText="improved"
                    imageUrl="https://user-images.githubusercontent.com/97470/75739421-a7138180-5cb9-11ea-9547-e64acf86eb59.png"
                  />
                  <ImageElement
                    altText="declined"
                    imageUrl="https://user-images.githubusercontent.com/97470/75739424-a7ac1800-5cb9-11ea-969a-e1ac9f12a41a.png"
                  />
                  <MarkdownText>
                    :evergreen_tree: :small_red_triangle_down: stats go here
                  </MarkdownText>
                </ContextBlock>
              </>
            ))
          )
        )}
      </Message>
    );

    expect(await render(msg)).toMatchSnapshot();
  });

  it('component with single nested component child', async () => {
    const message = (
      <ContextBlock>
        <PlainText>fooooo</PlainText>
      </ContextBlock>
    );
    expect(await render(message)).toMatchSnapshot();
  });

  it('component with span array children', async () => {
    const message = (
      <MarkdownText>
        link <Link href="https://google.com">hi google</Link>\n hi user{' '}
        <Mention userId="U12345" />
      </MarkdownText>
    );
    expect(await render(message)).toMatchSnapshot();
  });

  it('component with array of nested component children', async () => {
    const message = (
      <Message
        token="test_token"
        channel="test_channel"
        altText={<AltText>this is alt text</AltText>}
      >
        <SectionBlock>
          <PlainText emoji>section text :sadkeanu:</PlainText>
        </SectionBlock>
        <DividerBlock />
        <SectionBlock blockId="section1">
          <MarkdownText>```code```</MarkdownText>
        </SectionBlock>
      </Message>
    );
    expect(await render(message)).toMatchSnapshot();
  });

  it('component with component props', async () => {
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
    expect(await render(message)).toMatchSnapshot();
  });

  it('renders ActionsBlock elements as children', async () => {
    expect(
      await render(
        <ActionsBlock>
          <ButtonElement actionId="foo">Click</ButtonElement>
          <ImageElement
            imageUrl="https://api.slack.com/img/blocks/bkb_template_images/beagle.png"
            altText="alt"
          />
        </ActionsBlock>
      )
    ).toMatchSnapshot();
  });

  it('renders Markdown with a ProgressBar', async () => {
    expect(
      await render(
        <MarkdownText>
          progress: <ProgressBar columnWidth={10} total={300} value={200} />
        </MarkdownText>
      )
    ).toMatchObject({
      type: 'mrkdwn',
      text: 'progress: ▓▓▓▓▓▓▓░░░',
      verbatim: false,
    });
  });

  it('renders a Red ProgressBar', async () => {
    expect(
      await render(
        <MarkdownText>
          progress:{' '}
          <ProgressBar columnWidth={10} total={300} value={200} color="red" />
        </MarkdownText>
      )
    ).toMatchObject({
      type: 'mrkdwn',
      text: 'progress: `▓▓▓▓▓▓▓░░░`',
      verbatim: false,
    });
  });

  it('renders a complex message', async () => {
    const message = (
      <Message altText={<AltText>Hot code review alert</AltText>}>
        <SectionBlock>
          <MarkdownText>
            Hey <Mention userId="foo" />
            <LineBreak />
            Hot code review alert! :thermometer:
            <LineBreak />
            <Link href="foo">some title</Link> has *{34} discussions*. You're
            missing out!
          </MarkdownText>
        </SectionBlock>
        <ActionsBlock blockId="action-block-id">
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
    expect(await render(message)).toMatchSnapshot();
  });

  it('flattens multiple sections in an array', async () => {
    const message = (
      <Message altText={<AltText>New code review request</AltText>}>
        <SectionBlock>
          {true ? (
            <MarkdownText>
              Hey <Mention userId="42" />,
              <Mention userId="42" /> has requested your review for{' '}
              <Link href="http://foo.com">code review x</Link>'
            </MarkdownText>
          ) : (
            <MarkdownText>
              <Link href="http://google.com">
                Looks like you're assigned to a PullRequest
              </Link>
            </MarkdownText>
          )}
        </SectionBlock>
        {[1, 2, 3].map(num => (
          <SectionBlock>
            <PlainText>{num.toString()}</PlainText>
          </SectionBlock>
        ))}
      </Message>
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
