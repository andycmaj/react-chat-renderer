# React-slack-renderer

## Design Principles

* Support for Slack's new Blocks API first
  * Attachments considered legacy/obsolete
* Components are stateless. Follow a flux model. Props only, and map events to actions.
* Each Component encapsulates a parent-agnostic view of a Slack message entity (eg. a [layout block](https://api.slack.com/reference/messaging/blocks)). It's responsible for `render`ing its own JSON shape.
  * `render` should always return a JSON entity that is a subtree of a Slack message.

## Example

```js
const message = (
  <Message>
    <SectionBlock accessory={<ButtonElement actionId="doAThing">Go!</ButtonElement>}>
      <Text type="plaintext" emoji={true}>section text :sadkeanu:</Text>
    </SectionBlock>
    <DividerBlock />
    <SectionBlock blockId="section1">
      <Text type="mrkdwn">
        section ```code```
      </Text>
    </SectionBlock>
  </Message>
);

const json = SlackRenderer.render(message);
```

```json
{
  "response_type": "ephemeral",
  "blocks": [
    {
      "type": "section",
      "text": {
        "text": {
          "type": "plaintext",
          "emoji": true,
          "verbatim": false,
          "text": "section text :sadkeanu:"
        }
      }
    },
    { "type": "divider" },
    {
      "type": "section",
      "text": {
        "text": {
          "type": "mrkdwn",
          "emoji": false,
          "verbatim": false,
          "text": "section ```code```"
        }
      },
      "block_id": "section1"
    }
  ]
}
```
