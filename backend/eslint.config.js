import js from '@eslint/js';
import pluginTypescript from '@typescript-eslint/eslint-plugin';
import { defineConfig, globalIgnores } from 'eslint/config';
import pluginImport from 'eslint-plugin-import';
import pluginJest from 'eslint-plugin-jest';
import pluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import pluginSimpleImportSort from 'eslint-plugin-simple-import-sort';
import pluginUnusedImports from 'eslint-plugin-unused-imports';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default defineConfig([
  tseslint.configs.strict,
  tseslint.configs.stylistic,
  globalIgnores(['dist']),

  {
    name: 'main',
    files: ['**/*.ts', '**/*.mts', '**/*.cts'],
    plugins: {
      js,
      pluginTypescript,
      import: pluginImport,
    },
    languageOptions: { globals: globals.node },
    rules: {
      'import/first': 'error',
      'import/newline-after-import': 'error',
      'import/no-duplicates': 'error',
    },
  },

  {
    name: 'tests',
    files: ['**/*.spec.ts', '**/*.test.ts'],
    plugins: { jest: pluginJest },
    languageOptions: {
      globals: pluginJest.environments.globals.globals,
    },
    rules: {
      'jest/no-disabled-tests': 'warn',
      'jest/no-focused-tests': 'error',
      'jest/no-identical-title': 'error',
      'jest/prefer-to-have-length': 'warn',
      'jest/valid-expect': 'error',
    },
  },

  {
    name: 'imports',
    files: ['**/*.ts', '**/*.mts', '**/*.cts'],
    plugins: {
      'unused-imports': pluginUnusedImports,
      'simple-import-sort': pluginSimpleImportSort,
    },
    rules: {
      'no-unused-vars': 'off',
      'simple-import-sort/imports': 'error',
      'simple-import-sort/exports': 'error',
      'unused-imports/no-unused-imports': 'error',
      'unused-imports/no-unused-vars': [
        'warn',
        {
          vars: 'all',
          varsIgnorePattern: '^_',
          args: 'after-used',
          argsIgnorePattern: '^_',
        },
      ],
    },
  },

  tseslint.configs.recommended,
  pluginPrettierRecommended,
]);
