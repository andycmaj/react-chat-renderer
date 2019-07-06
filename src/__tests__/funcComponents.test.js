import React from 'react';
import SlackRenderer from '../renderer';
import { Message, PlainText, SectionBlock, FuncMessage } from '../index';

describe('renderer', () => {
  it('renders a Message with Hello, world text', () => {
    const block = (
      <SectionBlock>
        <PlainText emoji>Hello, world</PlainText>
      </SectionBlock>
    );

    const classOutput = SlackRenderer.render(
      <Message
        token="test_token"
        channel="test_channel"
        responseType="in_channel"
      >
        {block}
      </Message>
    );

    const funcOutput = SlackRenderer.render(<FuncMessage>{block}</FuncMessage>);

    expect(classOutput).toEqual(funcOutput);
  });
});
