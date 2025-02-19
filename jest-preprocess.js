const babelOptions = {
  presets: [
    '@babel/preset-env',
    '@babel/preset-react'
  ],
  plugins: [
    '@babel/plugin-transform-spread',
    '@babel/plugin-proposal-object-rest-spread',
    '@babel/plugin-proposal-class-properties',
    '@babel/plugin-syntax-dynamic-import',
    [
      'transform-remove-console',
      {
        'exclude': [
          'info',
          'error',
          'warn'
        ]
      }
    ],
    [
      '@babel/plugin-transform-runtime',
      {
        'corejs': false,
        'helpers': true,
        'regenerator': true,
        'useESModules': false
      }
    ],
    'babel-plugin-macros'
  ]
}

module.exports = require('babel-jest').createTransformer(babelOptions)
