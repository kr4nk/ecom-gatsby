import * as React from 'react'

import BestsellersShop from '../shop/bestsellers-shop'
import ProductsShop from '../shop/products-shop'

const ContentShop = (): JSX.Element => (
  <div>
    <BestsellersShop />

    <ProductsShop />
  </div>
)

export default ContentShop
