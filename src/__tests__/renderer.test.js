import React from 'react';
import SlackRenderer from '../renderer';

import { Message, Text, DividerBlock, SectionBlock } from '../index';

describe('renderer', () => {
  it('renders Hello, world', () => {
    const message = SlackRenderer.render(
      <Message responseType="in_channel">
        <Text>Hello, world</Text>
      </Message>
    );

    expect(message).toMatchSnapshot();
  });

  it('renders an array of Blocks', () => {
    const message = SlackRenderer.render(
      <Message>
        <DividerBlock />
        <SectionBlock>
          <Text>section text</Text>
        </SectionBlock>
      </Message>
    );

    console.log(JSON.stringify(message));

    expect(message).toMatchSnapshot();
  });
});
