import * as React from 'react'
import { Router } from '@reach/router'

import Universal from '../utils/universal'

const Account = (): JSX.Element => (
  <Router>
    <Universal
      page='dynamic/logout'
      path='/account/logout'
    />

    <Universal
      page='account/profile'
      path='/account/profile'
    />

    <Universal
      page='account/file-permit'
      path='/account/file/permit'
    />

    <Universal
      page='account/file-exemption'
      path='/account/file/exemption'
    />

    <Universal
      page='account/file-protected'
      path='/account/file/protected/:id'
    />

    <Universal
      page='account/downloads'
      path='/account/downloads'
    />

    <Universal
      page='account/registration'
      path='/account/registration'
    />

    <Universal
      page='account/pending'
      path='/account/pending'
    />

    <Universal
      page='account/search'
      path='/account/search'
    />

    <Universal
      page='account/shop'
      path='/account'
    />

    <Universal
      page='account/product'
      path='/account/product/:slug'
    />

    <Universal
      page='account/certificates'
      path='/account/certificates'
    />

    <Universal
      page='account/certificate'
      path='/account/certificate/:slug'
    />

    <Universal
      page='account/manufacturers'
      path='/account/manufacturers'
    />

    <Universal
      page='account/manufacturer'
      path='/account/manufacturer/:slug'
    />

    <Universal
      page='account/categories'
      path='/account/categories'
    />

    <Universal
      page='account/category'
      path='/account/category/:slug'
    />

    <Universal
      page='account/cart'
      path='/account/cart'
    />

    <Universal
      page='account/cart-shipping'
      path='/account/cart/shipping'
    />

    <Universal
      page='account/cart-review'
      path='/account/cart/review'
    />

    <Universal
      page='account/orders'
      path='/account/orders'
    />

    <Universal
      page='account/order'
      path='/account/order/:orderId'
    />

    <Universal
      page='account/order-refund'
      path='/account/order/:orderId/refund'
    />
  </Router>
)

export default React.memo(Account)
