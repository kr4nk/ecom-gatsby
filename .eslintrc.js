module.exports = {
  'parser': '@typescript-eslint/parser',
  'parserOptions': {
    'ecmaVersion': 2018,
    'sourceType': 'module',
    'ecmaFeatures': {
      'modules': true,
      'jsx': true
    },
    'useJSXTextNode': true,
    'project': './tsconfig.json',
    'tsconfigRootDir': './'
  },
  'extends': [
    // 'eslint:recommended',
    // 'plugin:compat/recommended',
    'plugin:jest/recommended',
    'plugin:@typescript-eslint/recommended',
    'typescript',
    'typescript/react',
    'standard',
    'standard-react',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:react/recommended',
    'plugin:react-redux/recommended',
    'plugin:react-perf/recommended',
    'plugin:jsx-a11y/recommended',
    'plugin:css-modules/recommended'
  ],
  'plugins': [
    '@typescript-eslint',
    '@getify/proper-arrows',
    'ascii',
    // 'compat',
    'dependencies',
    'es',
    'json',
    'babel',
    'jest',
    'import',
    'graphql',
    'jsx-a11y',
    'no-async-without-await',
    'optimize-regex',
    'perf-standard',
    'promise',
    'react',
    'react-hooks',
    'react-functional-set-state',
    'react-redux',
    'standard',
    'react-perf',
    'css-modules',
    'xss',
    'node',
    'no-inferred-method-name',
    'prettier',
    'markdown'
  ],
  'env': {
    'jest/globals': true,
    'jest': true,
    'browser': true,
    'es6': true,
    'node': true
  },
  'globals': {
    '__DEV__': false,
    '__PROD__': false,
    '__PLAYER_DEBUG__': false,
    '__BASENAME__': false
  },
  'settings': {
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx']
    },
    'import/resolver': {
      // use <root>/path/to/folder/tsconfig.json
      'typescript': {
        'directory': './tsconfig.json'
      }
    },
    'react': {
      'version': 'detect', // Tells eslint-plugin-react to automatically detect the version of React to use
    },
  },
  'rules': {
    '@getify/proper-arrows/params': [
      'warn', {
        'unused': 'trailing'
      }
    ],
    '@getify/proper-arrows/name': [
      'warn', { 'trivial': false }
    ],
    '@getify/proper-arrows/where': [
      'warn', { 'global': true }
    ],
    '@getify/proper-arrows/return': [
      'warn', { 'object': false }
    ],
    '@getify/proper-arrows/this': [
      'warn',
      'never', {
        'no-global': true
      }
    ],

    'es/no-async-iteration': 'error',
    'es/no-malformed-template-literals': 'error',
    'es/no-regexp-lookbehind-assertions': 'error',
    'es/no-regexp-named-capture-groups': 'error',
    'es/no-regexp-s-flag': 'error',
    'es/no-regexp-unicode-property-escapes': 'error',

    'no-async-without-await/no-async-without-await': 1,

    'node/exports-style': ['error', 'module.exports'],
    'node/prefer-global/buffer': ['error', 'always'],
    'node/prefer-global/console': ['error', 'always'],
    'node/prefer-global/process': ['error', 'always'],
    'node/prefer-global/url-search-params': ['error', 'always'],
    'node/prefer-global/url': ['error', 'always'],

    'ascii/valid-name': 2,
    'optimize-regex/optimize-regex': 'warn',

    'perf-standard/no-instanceof-guard': 2,
    'perf-standard/no-self-in-constructor': 2,
    'perf-standard/check-function-inline': 1,

    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',

    'jest/no-disabled-tests': 'warn',
    'jest/no-focused-tests': 'error',
    'jest/no-identical-title': 'error',
    'jest/prefer-to-have-length': 'warn',
    'jest/valid-expect': 'error',

    'standard/object-curly-even-spacing': [2, 'either'],
    'standard/array-bracket-even-spacing': [2, 'either'],
    'standard/computed-property-even-spacing': [2, 'even'],
    'standard/no-callback-literal': [2, ['cb', 'callback']],

    'css-modules/no-unused-class': 'off',
    'graphql/template-strings': ['error', {
      // Import default settings for your GraphQL client. Supported values:
      // 'apollo', 'relay', 'lokka', 'literal'
      env: 'apollo',

      // Import your schema JSON here
      schemaJson: require('./src/graphql/schema.json')

      // OR provide absolute path to your schema JSON
      //   schemaJsonFilepath: path.resolve(__dirname, 'src', 'qraphql', 'schema.json'),

      // OR provide the schema in the Schema Language format
      // schemaString: printSchema(schema),

      // tagName is gql by default
    }],
    'comma-dangle': [
      'error',
      {
        objects: 'only-multiline',
        arrays: 'only-multiline',
        imports: 'never',
        exports: 'never',
        functions: 'never',
      },
    ],
    'dependencies/case-sensitive': 1,
    'dependencies/no-cycles': 1,
    'dependencies/no-unresolved': 1,
    'dependencies/require-json-ext': 1,
    'react-functional-set-state/no-this-state-props': 2,
    'no-void': 2,
    'no-restricted-globals': 2,
    'no-use-before-define': ['error',
      {
        functions: false,
        classes: false
      }
    ],
    'func-names': 1,
    'no-unused-vars': 2,
    '@typescript-eslint/no-unused-vars': ['warn', { 'argsIgnorePattern': '^_' }],
    'guard-for-in': 2,
    'no-restricted-syntax': 2,
    'camelcase': [
      2,
      {
        'properties': 'never'
      }
    ],
    'babel/no-invalid-this': 1,
    'semi': 0,
    'spaced-comment': 0,
    'brace-style': 0,
    'no-trailing-spaces': 0,
    'import/default': 2,
    'import/no-unresolved': [
      2,
      {
        'commonjs': true,
        'amd': true
      }
    ],
    'import/named': 2,
    'import/namespace': 'off',
    'import/export': 2,
    'import/no-duplicates': 2,
    'import/imports-first': 2,

    '@typescript-eslint/camelcase': 'off',
    'import/named': 'off',
    'dependencies/no-unresolved': 'off',
    'jsx-a11y/html-has-lang': 'off',
    'react/prop-types': 'off',
    'no-useless-constructor': 'off', // TypeError: Cannot read property 'body' of null
    // 'template-curly-spacing' : 'off',
    // 'indent' : 'off',
    '@typescript-eslint/indent': 'off', //[2, 2],
    // 'jsx-a11y/label-has-for': 'off',
    'no-console': 'off',
    'react/no-typos': 'off',
    'max-len': 'off',
    'no-nested-ternary': 'off',
    'react-redux/prefer-separate-component-file': 'off',
    'react/destructuring-assignment': 'off',
    'import/prefer-default-export': 'off'
  }
}
