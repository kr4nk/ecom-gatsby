import * as React from 'react'

import * as layout from '../../styles/layout.module.css'

import NavCategories from './nav-categories'

import Bestsellers from './bestsellers'
import Products from './products'

const Shop = (): JSX.Element => (
  <div>
    <div className={layout.content}>
      <NavCategories />

      <div>
        <Bestsellers />

        <Products />
      </div>
    </div>
  </div>
)

export default Shop
