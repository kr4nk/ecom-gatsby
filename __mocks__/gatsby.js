const { createElement } = require('react')

const gatsby = jest.requireActual('gatsby')

module.exports = {
  ...gatsby,
  graphql: jest.fn(),
  Link: jest.fn().mockImplementation(({
    to,
    ...rest
  }) =>
    createElement('a', {
      ...rest,
      href: to,
    })
  ),
  StaticQuery: jest.fn(),
}
