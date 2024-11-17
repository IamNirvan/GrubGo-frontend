module.exports = {
    env: {
      browser: true,
      es2021: true,
    },
    extends: [
      'airbnb',
      'airbnb/hooks',
      'plugin:react/recommended',
      'plugin:prettier/recommended',
    ],
    overrides: [],
    parserOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
    },
    ignorePatterns: ['**/*.html'],
    plugins: ['react', 'prettier'],
    rules: {
      'react/react-in-jsx-scope': 0,
      'react/prop-types': 0,
      eqeqeq: 0,
      'jsx-a11y/label-has-associated-control': [
        'error',
        {
          required: {
            some: ['nesting', 'id'],
          },
        },
      ],
      'jsx-a11y/label-has-for': [
        'error',
        {
          required: {
            some: ['nesting', 'id'],
          },
        },
      ],
    },
  };
  