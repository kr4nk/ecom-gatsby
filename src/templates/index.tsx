import * as React from 'react'

import Layout from '../layout'

import Main from '../static/shop'

import { ContextIndex, TContextIndex } from '../context/index'

interface OwnProps {
  pageContext: TContextIndex;
}

const IndexPage = ({ pageContext }: OwnProps): JSX.Element => (
  <ContextIndex.Provider
    value={pageContext}
  >
    <Layout
      common
      title='Please Signin or Signup for purchasing our goods!'
      description='ecom-gatsby.com'
      keywords=' '
      canonical='/'
    >
      <Main />
    </Layout>
  </ContextIndex.Provider>
)

export default IndexPage
