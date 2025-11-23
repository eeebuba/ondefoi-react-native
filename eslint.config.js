const { defineConfig } = require('eslint/config');
const expoConfig = require('eslint-config-expo/flat');
const js = require('@eslint/js');
const tseslint = require('typescript-eslint');

module.exports = defineConfig([
  {
    ignores: [
      'node_modules/*',
      '.expo/*',
      'dist/*',
      'ios/*',
      'android/*',
      '**/@types/generated/*',
      'eslint.config.js',
      'metro.config.js',
    ],
  },
  expoConfig,
  js.configs.recommended,
  tseslint.configs.recommendedTypeChecked,
  {
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.json'],
        tsconfigRootDir: __dirname,
      },
    },
    rules: {
      '@typescript-eslint/no-non-null-assertion': 'warn',
      '@typescript-eslint/no-floating-promises': 'warn',
      '@typescript-eslint/no-misused-promises': 'warn',
      '@typescript-eslint/no-unused-vars': 'warn',
      '@typescript-eslint/require-await': 'off',
      'react/display-name': 'off',
      'react/prop-types': 'off',
    },
  },
]);
