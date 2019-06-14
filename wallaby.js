module.exports = wallaby => {
  return {
    files: ['src/**/*.js', '!src/**/__tests__/*.js'],
    tests: ['src/**/__tests__/*.js'],
    env: {
      type: 'node',
      runner: 'node',
    },

    testFramework: 'jest',
    setup: function(wallaby) {
      // var jestConfig = require('./package.json').jest;
      // /* for example:
      //  * jestConfig.globals = { "__DEV__": true }; */
      // wallaby.testFramework.configure(jestConfig);
    },

    compilers: {
      'src/**/*.js': wallaby.compilers.babel(),
    },

    debug: true,
  };
};
