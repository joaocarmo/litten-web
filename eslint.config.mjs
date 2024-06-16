// @ts-check
import globals from 'globals'
import eslint from '@eslint/js'
import tseslint from 'typescript-eslint'
import { fixupConfigRules, fixupPluginRules } from '@eslint/compat'
import { FlatCompat } from '@eslint/eslintrc'
// eslint-disable-next-line import/extensions
import reactRecommended from 'eslint-plugin-react/configs/recommended.js'
import eslintConfigPrettier from 'eslint-config-prettier'

const flatCompat = new FlatCompat({
  baseDirectory: import.meta.dirname,
  recommendedConfig: eslint.configs.recommended,
})

export default tseslint.config(
  eslint.configs.recommended,
  // ...tseslint.configs.recommendedTypeChecked,
  // ...tseslint.configs.stylisticTypeChecked,
  ...fixupConfigRules(reactRecommended),
  ...fixupConfigRules(flatCompat.extends('eslint-config-airbnb-typescript')),
  ...fixupConfigRules(flatCompat.extends('plugin:import/typescript')),
  eslintConfigPrettier,
  {
    ignores: [
      '.cache',
      'babel.config.js',
      'node_modules',
      'public',
      'stylelint.config.js',
    ],
  },
  {
    languageOptions: {
      parserOptions: {
        project: true,
        tsconfigRootDir: import.meta.dirname,
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: {
        ...globals.browser,
      },
    },
  },
  {
    plugins: {
      'react-hooks': legacyPlugin('eslint-plugin-react-hooks', 'react-hooks'),
      import: legacyPlugin('eslint-plugin-import', 'import'),
    },
  },
  {
    rules: {
      // '@typescript-eslint/no-unsafe-argument': 'off',
      // '@typescript-eslint/no-unsafe-assignment': 'off',
      // '@typescript-eslint/no-unsafe-call': 'off',
      // '@typescript-eslint/no-unsafe-member-access': 'off',
      '@typescript-eslint/no-use-before-define': 'off',
      'import/no-extraneous-dependencies': [
        'error',
        { devDependencies: ['eslint.config.mjs'] },
      ],
      'react/function-component-definition': [
        'error',
        {
          namedComponents: 'arrow-function',
          unnamedComponents: 'arrow-function',
        },
      ],
      'react/jsx-closing-bracket-location': 'off',
      'react/jsx-no-literals': [
        'error',
        { noStrings: true, ignoreProps: true },
      ],
      'react/jsx-props-no-spreading': 'off',
      'react/jsx-uses-react': 'off',
      'react/react-in-jsx-scope': 'off',
    },
  },
  {
    settings: {
      'import/parsers': {
        '@typescript-eslint/parser': ['.ts', '.tsx'],
      },
      'import/resolver': {
        typescript: {
          alwaysTryTypes: true,
        },
      },
      react: {
        version: 'detect',
      },
    },
  },
)

/**
 * @param {string} name the pugin name
 * @param {string} alias the plugin alias
 * @returns {import("eslint").ESLint.Plugin}
 */
function legacyPlugin(name, alias = name) {
  const plugin = flatCompat.plugins(name)[0]?.plugins?.[alias]

  if (!plugin) {
    throw new Error(`Unable to resolve plugin ${name} and/or alias ${alias}`)
  }

  return fixupPluginRules(plugin)
}
