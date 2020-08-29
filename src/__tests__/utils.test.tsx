import { renderMarkdown } from '../renderMarkdown';
describe('renderMarkdown', () => {
  it('renders markdown to slack markup', () => {
    const markdown = `
Thanks!

Your review of [Update README.md](https://github.com/botany-sanjuans/kayaking/pull/20) was helpful because...

**hero :bug: :thumbsup:**
**🌩 got it done quick**

Your tag collection:
**foo**: (*2x*)
`;

    const slackMarkup = renderMarkdown(markdown);

    expect(slackMarkup).toMatchInlineSnapshot(`
      "Thanks!

      Your review of <https://github.com/botany-sanjuans/kayaking/pull/20|Update README.md> was helpful because...

      ​*hero :bug: :thumbsup:*​
      ​*🌩 got it done quick*​

      Your tag collection:
      ​*foo*​: (​_2x_​)
      "
    `);
  });
});
