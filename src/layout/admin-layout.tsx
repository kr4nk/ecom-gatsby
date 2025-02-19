import * as React from 'react'
import classnames from 'classnames'

import Footer from './footer'
import Header from './header'
import NavMainAdmin from './nav-main-admin'

import * as layoutPage from '../styles/layout-page.module.css'

interface OwnProps {
  children: React.ReactNode;
}

const AdminLayout = ({ children }: OwnProps): JSX.Element => (
  <main className={layoutPage.main}>
    <Header />

    <div
      className={
        classnames(
          layoutPage.inner,
          layoutPage.container
        )
      }
    >
      <NavMainAdmin />

      <div className={layoutPage.content}>
        { children }
      </div>
    </div>

    <Footer />
  </main>
)

export default React.memo(AdminLayout)
