export default {
  extends: ['stylelint-config-recommended-scss'],
  plugins: ['stylelint-scss'],
  customSyntax: 'postcss-scss',
  rules: {
    'at-rule-no-unknown': null,
    'scss/at-rule-no-unknown': true,
  },
}
