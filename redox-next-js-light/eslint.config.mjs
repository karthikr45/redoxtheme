// Flat config for ESLint v9+
import next from 'eslint-config-next';

/** @type {import('eslint').FlatConfig[]} */
export default [
  ...next(),
  {
    rules: {
      // Flag unused variables but ignore underscore-prefixed variables and rest siblings
      'no-unused-vars': [
        'warn',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_', ignoreRestSiblings: true },
      ],
      // Common React/useEffect warning reduction while still being correct
      'react-hooks/exhaustive-deps': 'warn',
    },
  },
];
