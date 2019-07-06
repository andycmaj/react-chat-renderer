import React from 'react';
import SlackRenderer from '../renderer';
import {
  Message,
  PlainText,
  MarkdownText,
  DividerBlock,
  SectionBlock,
  ButtonElement,
  ProgressBar,
} from '../index';

describe('renderer', () => {
  it('renders a Message with Hello, world text', () => {
    expect(
      SlackRenderer.render(
        <Message
          token="test_token"
          channel="test_channel"
          responseType="in_channel"
        >
          <SectionBlock>
            <PlainText emoji>Hello, world</PlainText>
          </SectionBlock>
        </Message>
      )
    ).toMatchSnapshot();
  });

  it('renders a Message with an array of Blocks', () => {
    expect(
      SlackRenderer.render(
        <Message token="test_token" channel="test_channel">
          <SectionBlock
            accessory={<ButtonElement actionId="doAThing">Go!</ButtonElement>}
          >
            <PlainText emoji>section text :sadkeanu:</PlainText>
          </SectionBlock>
          <DividerBlock />
          <SectionBlock blockId="section1">
            <MarkdownText>```code```</MarkdownText>
          </SectionBlock>
        </Message>
      )
    ).toMatchSnapshot();
  });

  it('renders a Block component without a parent Message', () => {
    expect(
      SlackRenderer.render(
        <SectionBlock blockId="section1">
          <PlainText emoji>section ```code```</PlainText>
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

  it('renders Markdown with a ProgressBar', () => {
    expect(
      SlackRenderer.render(
        <MarkdownText>
          progress: <ProgressBar columnWidth="10" total="300" value="200" />
        </MarkdownText>
      )
    ).toEqual({
      type: 'mrkdwn',
      text: 'progress: ▓▓▓▓▓▓▓░░░',
      verbatim: false,
    });
  });

  it('renders a Red ProgressBar', () => {
    expect(
      SlackRenderer.render(
        <MarkdownText>
          progress:{' '}
          <ProgressBar columnWidth="10" total="300" value="200" color="red" />
        </MarkdownText>
      )
    ).toEqual({
      type: 'mrkdwn',
      text: 'progress: `▓▓▓▓▓▓▓░░░`',
      verbatim: false,
    });
  });

  it('renders a Message with child expression', () => {
    const block = (
      <SectionBlock>
        <PlainText emoji>Hello, world</PlainText>
      </SectionBlock>
    );

    const out1 = SlackRenderer.render(
      <Message
        token="test_token"
        channel="test_channel"
        responseType="in_channel"
      >
        {block}
      </Message>
    );

    const out2 = SlackRenderer.render(
      <Message
        token="test_token"
        channel="test_channel"
        responseType="in_channel"
      >
        {block}
      </Message>
    );

    expect(out1).toEqual(out2);
  });
});
