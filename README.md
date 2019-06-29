# React-slack-renderer

[![npm version](https://img.shields.io/npm/v/react-slack-renderer.svg?style=for-the-badge)](https://npmjs.org/package/react-slack-renderer "View this project on npm")

I wanted to build rich, interactive Slack and Discord workflows in a familiar idiom. Hence, a custom React renderer for declarative chat interactions.

## Design Principles

* Support Slack's new [Interactive Messaging Workflows](https://api.slack.com/messaging/interactivity).
  * Attachments considered legacy/obsolete
* Components are stateless, but message handlers will follow a redux/flux model. Props only, and map event handlers to actions.
* Each Component encapsulates a parent-agnostic view of a Slack message entity (eg. a [layout block](https://api.slack.com/reference/messaging/blocks)). It's responsible for `render`ing its own JSON shape.
  * `render` should always return a JSON entity that is a subtree of a Slack message.

## Upcoming

* [redux-like state management for slack interaction workflows](https://github.com/andycmaj/react-chat-renderer/issues/4)
* discord support
* more out-of-the-box elements

## Inspirations

* [ink](https://github.com/vadimdemedes/ink/blob/master/src/reconciler.js)
* [react-ionize](https://github.com/mhink/react-ionize/blob/master/src/IonizeHostConfig.js)
* [react-synth](https://github.com/FormidableLabs/react-synth)
* [react-slack](https://github.com/andreyvital/react-slack-renderer/blob/master/components/SlackAttachment.js)

## Example

### React `Message`

```js
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

const json = SlackRenderer.render(message);
```

### Rendered JSON Message

```json
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
                "text": "section ```code``` *progress:* `ââââââââââ`",
                "verbatim": false
            },
            "block_id": "section1"
        }
    ]
}
```
