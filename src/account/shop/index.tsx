import * as React from 'react'

import NavCategories from '../nav-categories'
import ContentShop from '../common/content-shop'

import * as layout from '../../styles/layout.module.css'

const Shop = (): JSX.Element => (
  <div>
    <div className={layout.content}>
      <NavCategories />

      <ContentShop />
    </div>
  </div>
)

export default Shop
