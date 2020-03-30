# React-chat-renderer

[![npm version](https://img.shields.io/npm/v/react-chat-renderer.svg?style=for-the-badge)](https://npmjs.org/package/react-chat-renderer 'View this project on npm')

I wanted to build rich, interactive Slack and Discord workflows in a familiar idiom. Hence, a custom React renderer for declarative chat interactions.

## Design Principles

- Support Slack's new [Block-kit](https://api.slack.com/block-kit) and [Interactive Messaging Workflows](https://api.slack.com/messaging/interactivity).
  - Attachments considered legacy/obsolete
- Each Component is a pure function with a parent-agnostic view of a Slack message entity (eg. a [layout block](https://api.slack.com/reference/messaging/blocks)). It's responsible for `render`ing its own JSON shape.
  - these `FCs` should always return a JSON entity that is a subtree of a Slack message.
- Should be able to build USEFUL, self-contained components that can do asynchronous things. Don't need a full-blown hooks implementation, but you [CAN make the JSX factory asynchronous](https://github.com/asynchronous-dev/react-chat-renderer/blob/master/src/__tests__/renderer.test.tsx#L330).

## Upcoming

- Microsoft Teams support
- more out-of-the-box elements

## Inspirations

- [React-pdf](https://github.com/diegomura/react-pdf)
- [ink](https://github.com/vadimdemedes/ink/blob/master/src/reconciler.js)
- [react-ionize](https://github.com/mhink/react-ionize/blob/master/src/IonizeHostConfig.js)
- [react-synth](https://github.com/FormidableLabs/react-synth)
- [react-slack](https://github.com/andreyvital/react-slack-renderer/blob/master/components/SlackAttachment.js)
- [jsx-slack](https://github.com/speee/jsx-slack/blob/master/src/jsx.ts#L146)

## Example

### Asynchronous components

```jsx
/** @jsx slack.h */
/** @jsxFrag slack.Fragment */
import {
  slack,
  render,
  ContextBlock,
  ImageElement,
  PlainText,
  FC,
} from 'react-chat-renderer';

  const DeltaIndicator: FC<{delta: number}, any> = async ({ delta }) => {
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
```

### JSX `Message`

````jsx
/** @jsx slack.h */
import {
  slack,
  DividerBlock,
  SectionBlock,
  ButtonElement,
  PlainText,
  MarkdownText,
  ProgressBar,
  Message,
} from '..';

const message = (
  <Message responseType="in_channel">
    <SectionBlock
      accessory={<ButtonElement actionId="doAThing">Go!</ButtonElement>}
    >
      <PlainText emoji>section text :sadkeanu:</PlainText>
    </SectionBlock>
    <DividerBlock />
    <SectionBlock blockId="section1">
      <MarkdownText>
        section ```code``` *progress:*{' '}
        <ProgressBar color="red" columnWidth="10" total="300" value="200" />
      </MarkdownText>
    </SectionBlock>
  </Message>
);
````

### Rendered JSON Message

![slack message](/docs/slack-message.png)

````json
{
  "response_type": "in_channel",
  "as_user": false,
  "blocks": [
    {
      "type": "section",
      "accessory": {
        "type": "button",
        "text": {
          "type": "plain_text",
          "emoji": true,
          "text": "Go!"
        },
        "action_id": "doAThing"
      },
      "text": {
        "type": "plain_text",
        "text": "section text :sadkeanu:",
        "emoji": true
      }
    },
    {
      "type": "divider"
    },
    {
      "type": "section",
      "text": {
        "type": "mrkdwn",
        "text": "section ```code``` *progress:* `▓▓▓▓▓▓▓░░░`",
        "verbatim": false
      },
      "block_id": "section1"
    }
  ]
}
````
