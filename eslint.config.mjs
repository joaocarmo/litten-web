import globals from 'globals'
import eslint from '@eslint/js'
import tseslint from 'typescript-eslint'
import reactPlugin from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
import jsxA11y from 'eslint-plugin-jsx-a11y'
import importX from 'eslint-plugin-import-x'
import { createTypeScriptImportResolver } from 'eslint-import-resolver-typescript'
import prettierRecommended from 'eslint-plugin-prettier/recommended'

export default tseslint.config(
  {
    ignores: [
      '.cache',
      'babel.config.js',
      'eslint.config.mjs',
      'node_modules',
      'public',
      'stylelint.config.mjs',
    ],
  },

  // Base JS + TypeScript
  eslint.configs.recommended,
  tseslint.configs.recommended,

  // React
  reactPlugin.configs.flat.recommended,
  reactPlugin.configs.flat['jsx-runtime'],

  // React Hooks — only classic rules (v7 recommended includes Compiler rules)
  {
    plugins: { 'react-hooks': reactHooks },
    rules: {
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
    },
  },

  // Accessibility
  jsxA11y.flatConfigs.recommended,

  // Imports
  importX.flatConfigs.recommended,
  importX.flatConfigs.typescript,

  // Prettier — must be last to override formatting rules
  prettierRecommended,

  // Global settings
  {
    languageOptions: {
      globals: {
        ...globals.browser,
      },
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    settings: {
      'import-x/resolver-next': [
        createTypeScriptImportResolver({
          alwaysTryTypes: true,
        }),
      ],
      react: {
        version: '18.3',
      },
    },
  },

  // Custom rules
  {
    rules: {
      '@typescript-eslint/ban-ts-comment': [
        'error',
        { 'ts-expect-error': 'allow-with-description' },
      ],
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-use-before-define': 'off',
      'import-x/default': 'off',
      'react/function-component-definition': [
        'error',
        {
          namedComponents: 'arrow-function',
          unnamedComponents: 'arrow-function',
        },
      ],
      'react/jsx-no-literals': [
        'error',
        { noStrings: true, ignoreProps: true },
      ],
      'react/jsx-props-no-spreading': 'off',
    },
  },
)
