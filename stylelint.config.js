module.exports = {
  extends: ['stylelint-config-recommended-scss', 'stylelint-config-prettier'],
  plugins: ['stylelint-scss'],
  customSyntax: 'postcss-scss',
  rules: {
    'at-rule-no-unknown': null,
    'scss/at-rule-no-unknown': true,
  },
}
