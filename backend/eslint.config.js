import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import { defineConfig } from 'eslint/config';
import pluginImport from 'eslint-plugin-import';
import pluginTypescript from '@typescript-eslint/eslint-plugin';
import pluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import pluginSimpleImportSort from 'eslint-plugin-simple-import-sort';
import pluginJest from 'eslint-plugin-jest';

export default defineConfig([
  tseslint.configs.strict,
  tseslint.configs.stylistic,
  {
    name: 'main',
    files: ['**/*.{js,mjs,cjs,ts,mts,cts}'],
    plugins: {
      js,
      pluginImport,
      pluginTypescript,
      pluginSimpleImportSort,
      pluginPrettierRecommended,
    },
    languageOptions: { globals: globals.node },
    rules: {
      'array-element-newline': ['error', { multiline: true, minItems: 5 }],
      'array-bracket-newline': ['error', { multiline: true }],
      'no-unused-vars': 'warn',
      '@typescript-eslint/no-explicit-any': 'error',
      // 'import/first': 'error',
      // 'import/newline-after-import': 'error',
      // 'import/no-duplicates': 'error',
      // 'simple-import-sort/imports': 'error',
      // 'simple-import-sort/exports': 'error',
    },
  },
  {
    name: 'tests',
    files: ['**/*.spec.js', '**/*.test.js'],
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

  // tseslint.configs.recommended,
  // pluginPrettierRecommended,
]);
