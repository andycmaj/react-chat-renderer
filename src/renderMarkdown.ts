import slackify from 'slackify-markdown';

export const renderMarkdown = (markdown: string): string => slackify(markdown);
