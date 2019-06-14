import React from 'react';
import SlackRenderer from '../renderer';
import {
  Message,
  Text,
  DividerBlock,
  SectionBlock,
  ButtonElement,
  ImageElement,
} from '../index';

describe('renderer', () => {
  it('renders a Message with Hello, world text', () => {
    expect(
      SlackRenderer.render(
        <Message responseType="in_channel">
          <Text>Hello, world</Text>
        </Message>
      )
    ).toMatchSnapshot();
  });

  it('renders a Message with an array of Blocks', () => {
    expect(
      SlackRenderer.render(
        <Message>
          <SectionBlock
            accessory={<ButtonElement actionId="doAThing">Go!</ButtonElement>}
          >
            <Text type="plaintext" emoji={true}>
              section text :sadkeanu:
            </Text>
          </SectionBlock>
          <DividerBlock />
          <SectionBlock blockId="section1">
            <Text type="mrkdwn">section ```code```</Text>
          </SectionBlock>
        </Message>
      )
    ).toMatchSnapshot();
  });

  it('renders a Block component without a parent Message', () => {
    expect(
      SlackRenderer.render(
        <SectionBlock blockId="section1">
          <Text type="plain_text" verbatim={true} emoji={true}>
            section ```code```
          </Text>
        </SectionBlock>
      )
    ).toMatchSnapshot();
  });

  it('renders a ButtonElement', () => {
    expect(
      SlackRenderer.render(
        <ButtonElement actionId="doAThing">Go!</ButtonElement>
      )
    ).toMatchSnapshot();
  });
});
