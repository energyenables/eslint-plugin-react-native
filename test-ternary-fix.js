const { RuleTester } = require('eslint');
const rule = require('./lib/rules/no-inline-styles');

const ruleTester = new RuleTester({
  parser: require.resolve('@babel/eslint-parser'),
  parserOptions: {
    requireConfigFile: false,
    babelOptions: {
      parserOpts: {
        plugins: [
          ['estree', { classFeatures: true }],
          'jsx',
        ],
      },
    },
  },
});

// This test verifies that ternary expressions with variables are not reported as inline styles
ruleTester.run('no-inline-styles', rule, {
  valid: [
    {
      code: `
        const Example = (props) => {
          const insets = { top: 10 };
          return (
            <View
              style={{
                height: props.insetTop ? insets.top : 0,
              }}
            />
          );
        };
      `,
    },
  ],
  invalid: [
    {
      code: `
        const Example = (props) => {
          return (
            <View
              style={{
                height: 50, // This should be reported
              }}
            />
          );
        };
      `,
      errors: [{
        message: 'Inline style: { height: 50 }',
      }],
    },
  ],
});
