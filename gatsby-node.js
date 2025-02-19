module.exports.onCreateWebpackConfig = function onCreateWebpackConfig ({ stage, actions }) {
  if ([
    'develop',
    'develop-html',
    'build-html',
    'build-javascript'
  ].includes(stage)) {
    actions.setWebpackConfig({
      module: {
        rules: [
          {
            test: /\.(graphql|gql)$/,
            exclude: /node_modules/,
            loader: 'graphql-tag/loader'
          }
        ]
      }
    })
  }
}

module.exports.createPages = require('./create-pages.ts').default

module.exports.onPostBuild = function onPostBuild () {
  // eslint-disable-next-line no-console
  console.log('onPostBuild exit code 0')
  process.exit(0)
}
