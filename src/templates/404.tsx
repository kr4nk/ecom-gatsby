import * as React from 'react'

import Layout from '../layout'

import Main from '../static/notfound'

const NotFoundPage = (): JSX.Element => (
  <Layout
    common
    title='404 | Page not found'
    description='Whoops! We cannot seem to find the page you are looking for.'
    keywords=' '
    canonical='/notfound'
  >
    <Main />
  </Layout>
)

export default React.memo(NotFoundPage)
