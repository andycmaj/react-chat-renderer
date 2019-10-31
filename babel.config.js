module.exports = {
  presets: [
    '@babel/typescript',
    [
      '@babel/env',
      {
        targets: {
          node: 'current',
        },
        debug: true,
      },
    ],
  ],
  plugins: [
    // [
    //   '@wordpress/babel-plugin-import-jsx-pragma',
    //   {
    //     scopeVariable: 'slack',
    //     source: 'react-chat-renderer',
    //     isDefault: true,
    //   },
    // ],
    // [
    //   '@babel/transform-react-jsx',
    //   {
    //     pragma: 'slack',
    //   },
    // ],
    '@babel/proposal-class-properties',
    '@babel/transform-modules-commonjs',
    '@babel/proposal-object-rest-spread',
  ],
};
