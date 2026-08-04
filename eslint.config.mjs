import nextConfig from 'eslint-config-next';
import prettierConfig from 'eslint-config-prettier';
import tseslint from 'typescript-eslint';

const config = [
  ...nextConfig,
  ...tseslint.configs.recommended,
  prettierConfig,
  {
    rules: {
      'react/react-in-jsx-scope': 'off',
      'react/display-name': 'off',
      'react/prop-types': 'off',
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/explicit-member-accessibility': 'warn',
      '@typescript-eslint/no-var-requires': 'warn',
      '@typescript-eslint/no-use-before-define': 'warn',
      '@typescript-eslint/ban-ts-comment': 'warn',
      'prefer-const': 'error',
      'react/self-closing-comp': 'error',
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          caughtErrorsIgnorePattern: '^_',
        },
      ],
    },
  },
  {
    ignores: ['**/*.d.ts', 'jest.config.js'],
  },
];

export default config;
