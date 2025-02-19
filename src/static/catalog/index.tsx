import * as React from 'react'

import Categories from './categories'
import ButtonSignInShop from '../common/button-signin-shop'

import * as layout from '../../styles/layout.module.css'
import * as defaultCommon from '../../styles/default-common.module.css'
import * as defaultCatalog from '../../styles/default-catalog.module.css'

const Catalog = (): JSX.Element => (
  <div className={layout.container}>
    <div className={layout.content}>
      <h1 className={layout.pageTitle}>
        Catalog
      </h1>

      <section className={layout.section}>
        <div className={defaultCatalog.categories}>
          <Categories />
        </div>

        <div className={defaultCommon.signInShop}>
          <ButtonSignInShop />
        </div>
      </section>
    </div>
  </div>
)

export default Catalog
