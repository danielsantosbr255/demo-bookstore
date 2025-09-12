import js from '@eslint/js';
import pluginImport from 'eslint-plugin-import';
import pluginJest from 'eslint-plugin-jest';
import pluginPrettierRecomended from 'eslint-plugin-prettier/recommended';
import { defineConfig, globalIgnores } from 'eslint/config';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default defineConfig([
  tseslint.configs.strict,
  tseslint.configs.stylistic,
  tseslint.configs.recommended,
  globalIgnores(['dist', '**/*.js']),
  {
    name: 'main',
    files: ['**/*.ts', '**/*.mts', '**/*.cts'],
    plugins: {
      js,
      import: pluginImport,
    },
    languageOptions: { globals: globals.node },
    rules: {
      'no-unused-vars': 'off',
      'import/first': 'warn',
      'import/order': 'warn',
      'import/newline-after-import': 'warn',
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
  pluginPrettierRecomended,
]);
