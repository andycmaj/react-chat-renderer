module.exports = {
  presets: [
    '@babel/typescript',
    [
      '@babel/env',
      {
        targets: {
          node: 'current',
        },
        debug: false,
      },
    ],
  ],
  plugins: [
    [
      '@wordpress/babel-plugin-import-jsx-pragma',
      {
        scopeVariable: 'slack',
        source: '..',
        isDefault: false,
      },
    ],
    [
      '@babel/transform-react-jsx',
      {
        pragma: 'slack.h',
        pragmaFrag: 'slack.Fragment',
      },
    ],
  ],
};
