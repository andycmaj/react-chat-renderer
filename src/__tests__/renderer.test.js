import React from 'react';
import SlackRenderer from '../renderer';
import {
  Message,
  PlainText,
  MarkdownText,
  DividerBlock,
  SectionBlock,
  ButtonElement,
} from '../index';

describe('renderer', () => {
  it('renders a Message with Hello, world text', () => {
    expect(
      SlackRenderer.render(
        <Message responseType="in_channel">
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
        <Message>
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
});
