import js from '@eslint/js';
import prettier from 'eslint-config-prettier';
import svelte from 'eslint-plugin-svelte';
import globals from 'globals';

export default [
  {
    ignores: [
      'build/**',
      '.codex/**',
      '.devcontainer/**',
      '.ona/**',
      '.svelte-kit/**',
      'node_modules/**',
      'package/**',
      'static/pagefind/**',
    ],
  },
  js.configs.recommended,
  ...svelte.configs.recommended,
  prettier,
  ...svelte.configs.prettier,
  {
    languageOptions: {
      ecmaVersion: 2024,
      sourceType: 'module',
      globals: {
        ...globals.browser,
        ...globals.node,
        __CPEmbed: 'readonly',
        getCookie: 'readonly',
      },
    },
    rules: {
      'svelte/no-at-html-tags': 'off',
      'svelte/no-navigation-without-resolve': 'off',
      'svelte/no-unused-svelte-ignore': 'off',
      'svelte/prefer-svelte-reactivity': 'off',
      'svelte/require-each-key': 'off',
    },
  },
];
