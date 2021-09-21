/** @jsx slack.h */
/** @jsxFrag slack.Fragment */
import { View } from '@slack/types';
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
  BlockQuote,
  SingleSelectElement,
  MultiSelectElement,
  Home,
  ActionsBlockProps,
  CheckboxElement,
  FC,
} from '..';
import {
  RadioButtonsElement,
  ConversationsSelect,
  ChannelSelect,
  InputBlock,
  TimePickerElement,
  MultiExternalSelectElement,
  OverflowMenu,
} from '../components';

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
    const linkText = 'hi & <google>';
    const message = (
      <MarkdownText>
        link <Link href="https://google.com">{linkText}</Link>\n hi user{' '}
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

  it('renders inline text elements with promises returning text elements', async () => {
    const renderText = () => {
      const strings = ['foo', 'bar'].map(s => <Mention userId={s} />);
      return <>world! {strings}</>;
    };

    const Emoji: FC<{ value: number }, string> = ({ value }) => ':thumbsup:';

    const message = (
      <ContextBlock>
        <MarkdownText>
          Hello, {renderText()}, <Emoji value={1} />
        </MarkdownText>
      </ContextBlock>
    );

    expect(await render(message)).toMatchSnapshot();
  });

  it('only renders as_user when explicitly set', async () => {
    const message = (
      <Message
        token="test_token"
        channel="test_channel"
        altText={<AltText>as user</AltText>}
        asUser
      >
        <SectionBlock>
          <PlainText emoji>sent as user</PlainText>
        </SectionBlock>
      </Message>
    );
    expect(await render(message)).toMatchSnapshot();
  });

  it('can create custom components based on block kit', async () => {
    const NudgeActionsBlock: FC<
      ActionsBlockProps & { nudgeState: { id: number } },
      ReturnType<typeof ActionsBlock>
    > = ({ nudgeState, children, ...rest }) => (
      <ActionsBlock {...rest} blockId={nudgeState.id.toString()}>
        {children}
      </ActionsBlock>
    );
  });

  it('renders BlockQuote', async () => {
    const message = (
      <BlockQuote>this is a test{'\n'}this too is a test</BlockQuote>
    );
    expect(await render(message)).toMatchSnapshot();
  });

  it('renders an external multi-select', async () => {
    const message = (
      <MultiExternalSelectElement
        actionId="action1"
        placeholder={<PlainText>placeholder text</PlainText>}
        initialOptions={[
          {
            text: <PlainText>option 1</PlainText>,
            value: 'value1',
          },
        ]}
      />
    );

    expect(await render(message)).toMatchSnapshot();
  });

  it('renders a simple multi-select', async () => {
    const message = (
      <MultiSelectElement
        actionId="action1"
        placeholder={<PlainText>placeholder text</PlainText>}
        initialOptions={[
          {
            text: <PlainText>option 1</PlainText>,
            value: 'value1',
          },
        ]}
        options={[
          {
            text: <PlainText>option 1</PlainText>,
            value: 'value1',
          },
          {
            text: <PlainText>option 2</PlainText>,
            value: 'value2',
          },
        ]}
      />
    );

    console.log(JSON.stringify(await render(message), null, 2));

    expect(await render(message)).toMatchSnapshot();
  });

  it('renders a multi-select with option_groups', async () => {
    const message = (
      <MultiSelectElement
        actionId="action1"
        placeholder={<PlainText>placeholder text</PlainText>}
        initialOptions={[
          {
            text: <PlainText>option 1</PlainText>,
            value: 'value1',
          },
        ]}
        optionGroups={[
          {
            label: <PlainText>Empty Group</PlainText>,
            options: [],
          },
          {
            label: <PlainText>Group 1</PlainText>,
            options: [
              {
                text: <PlainText>option 1</PlainText>,
                value: 'value1',
              },
              {
                text: <PlainText>option 2</PlainText>,
                value: 'value2',
              },
            ],
          },
          {
            label: <PlainText>Group 2</PlainText>,
            options: [
              {
                text: <PlainText>option 1</PlainText>,
                value: 'value3',
              },
              {
                text: <PlainText>option 2</PlainText>,
                value: 'value4',
              },
            ],
          },
        ]}
      />
    );

    const view = await render(message);

    expect(view.option_groups[0].options).toMatchObject([]);

    console.log(JSON.stringify(view, null, 2));

    expect(view).toMatchSnapshot();
  });

  it('renders a simple single-select', async () => {
    const message = (
      <SingleSelectElement
        actionId="action1"
        initialOption={{
          text: <PlainText>option 1</PlainText>,
          value: 'value1',
        }}
        placeholder={<PlainText>placeholder text</PlainText>}
        options={[
          {
            text: <PlainText>option 1</PlainText>,
            value: 'value1',
          },
          {
            text: <PlainText>option 2</PlainText>,
            value: 'value2',
          },
        ]}
      />
    );
    expect(await render(message)).toMatchSnapshot();
  });

  it('renders a single-select with option_groups', async () => {
    const message = (
      <SingleSelectElement
        actionId="action1"
        initialOption={{
          text: <PlainText>option 1</PlainText>,
          value: 'value1',
        }}
        placeholder={<PlainText>placeholder text</PlainText>}
        optionGroups={[
          {
            label: <PlainText>Group 1</PlainText>,
            options: [
              {
                text: <PlainText>option 1</PlainText>,
                value: 'value1',
              },
              {
                text: <PlainText>option 2</PlainText>,
                value: 'value2',
              },
            ],
          },
          {
            label: <PlainText>Group 2</PlainText>,
            options: [
              {
                text: <PlainText>option 1</PlainText>,
                value: 'value3',
              },
              {
                text: <PlainText>option 2</PlainText>,
                value: 'value4',
              },
            ],
          },
        ]}
      />
    );
    expect(await render(message)).toMatchSnapshot();
  });

  it('renders a simple checkbox', async () => {
    const message = (
      <CheckboxElement
        actionId="action1"
        options={[
          {
            text: <PlainText>option 1</PlainText>,
            description: 'description',
            value: 'value1',
          },
          {
            text: <PlainText>option 2</PlainText>,
            value: 'value2',
            url: 'https://botany.io',
          },
        ]}
      />
    );
    expect(await render(message)).toMatchSnapshot();
  });

  it('renders a radiobutton group', async () => {
    const message = (
      <RadioButtonsElement
        actionId="action1"
        options={[
          {
            text: <PlainText>on</PlainText>,
            description: 'description',
            value: 'value1',
          },
          {
            text: <PlainText>off</PlainText>,
            value: 'value2',
            url: 'https://botany.io',
          },
        ]}
        initialOption={{
          text: <PlainText>on</PlainText>,
          description: 'description',
          value: 'value1',
        }}
      />
    );
    expect(await render(message)).toMatchSnapshot();
  });

  it('renders Home view', async () => {
    const message = (
      <Home title="Title Text">
        <SectionBlock>
          <MarkdownText>this is a test{'\n'}this too is a test</MarkdownText>
        </SectionBlock>
      </Home>
    );
    expect(await render(message)).toMatchSnapshot();
  });

  it('renders ChannelsSelect', async () => {
    const message = <ChannelSelect actionId="channels-action-id" />;
    expect(await render(message)).toMatchSnapshot();
  });

  it('renders ConversationsSelect with no filter', async () => {
    const message = (
      <ConversationsSelect
        responseUrlEnabled={true}
        actionId="conversations-action-id"
      />
    );
    expect(await render(message)).toMatchSnapshot();
  });

  it('renders ConversationsSelect with filter', async () => {
    const message = (
      <ConversationsSelect
        responseUrlEnabled={true}
        actionId="conversations-action-id"
        filter={{ include: ['public'] }}
      />
    );
    expect(await render(message)).toMatchSnapshot();
  });

  it('simple input block test', async () => {
    const message = (
      <InputBlock label="test" optional={true}>
        <SingleSelectElement
          actionId="action1"
          initialOption={{
            text: <PlainText>option 1</PlainText>,
            value: 'value1',
          }}
          placeholder={<PlainText>placeholder text</PlainText>}
          options={[
            {
              text: <PlainText>option 1</PlainText>,
              value: 'value1',
            },
            {
              text: <PlainText>option 2</PlainText>,
              value: 'value2',
            },
          ]}
        />{' '}
      </InputBlock>
    );
    expect(await render(message)).toMatchSnapshot();
  });

  it('renders a beta time picker', async () => {
    const message = (
      <TimePickerElement
        initialTime="22:04"
        actionId="actionid"
        placeholder={<PlainText>placeholder text</PlainText>}
      />
    );
    expect(await render(message)).toMatchSnapshot();
  });

  it('renders with a class prop', async () => {
    const expectedNameProp = 'testName';
    class TestClass {
      private name: string;
      constructor(name: string) {
        this.name = name;
      }

      get theName(): string {
        return this.name;
      }
    }

    interface ComponentProps {
      testClass: TestClass;
      children?: never;
    }

    const Component: FC<ComponentProps, ReturnType<typeof Message>> = ({
      testClass,
    }) => {
      const name = testClass.theName;
      expect(name).toEqual(expectedNameProp);
      return (
        <SectionBlock>
          <MarkdownText>can you see me</MarkdownText>
        </SectionBlock>
      );
    };

    const message = (
      <Message altText={<AltText>Code review activity</AltText>}>
        <Component testClass={new TestClass(expectedNameProp)} />
      </Message>
    );
    expect(await render(message)).toMatchSnapshot();
  });

  it('renders an overflow menu', async () => {
    const message = (
      <OverflowMenu
        actionId="action1"
        options={[
          {
            text: <PlainText>option 1</PlainText>,
            value: 'value1',
          },
          {
            text: <PlainText>option 2</PlainText>,
            value: 'value2',
          },
        ]}
      />
    );
    expect(await render(message)).toMatchSnapshot();
  });
});
