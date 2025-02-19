import * as React from 'react'
import { withPrefix } from 'gatsby'

import { fetchInject } from '../utils/fetch-inject'

import * as landing from '../styles/landing.module.css'

import Head from '../layout/head'

import Header from '../static/landing/header'
import About from '../static/landing/about'

import Footer from '../static/landing/footer'

// eslint-disable-next-line perf-standard/check-function-inline
function Landing (): JSX.Element {
  React.useEffect(
    function loadResources (): void {
      console.log('run fetchInject')
      fetchInject([withPrefix('/css/landing-fonts.css')])
    }, []
  )

  return (
    <div className={landing.layout}>
      <Head
        title='title'
        description='descr'
        keywords=' '
        canonical='/'
      />

      <Header />

      <About />

      <Footer />
    </div>
  )
}

export default React.memo(Landing)
