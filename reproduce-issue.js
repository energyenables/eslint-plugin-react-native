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
  invalid: [],
});
