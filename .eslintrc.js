module.exports = {
  root: true,
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 13,
    sourceType: 'module',
  },
  env: {
    browser: true,
    es2020: true,
  },
  extends: ['airbnb', 'airbnb/hooks', 'plugin:prettier/recommended'],
  plugins: ['react'],
  rules: {
    'react/function-component-definition': [
      'error',
      {
        namedComponents: 'arrow-function',
        unnamedComponents: 'arrow-function',
      },
    ],
    'react/jsx-closing-bracket-location': 'off',
    'react/jsx-no-literals': ['error', { noStrings: true, ignoreProps: true }],
    'react/jsx-props-no-spreading': 'off',
    'react/jsx-uses-react': 'off',
    'react/react-in-jsx-scope': 'off',
    semi: ['error', 'never'],
  },
}
