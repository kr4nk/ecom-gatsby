import * as React from 'react'

import Item from '../cart-common/item-cart'

import * as userCart from '../../styles/user-cart.module.css'

import { TProduct, TProducts } from '../../types/account'
import { TImmutableIds } from '../../types/common'

interface OwnProps {
  ids: TImmutableIds;
  products: TProducts;
}

const ListCart = ({ ids, products }: OwnProps): JSX.Element => (
  <div className={userCart.cartItems}>
    {
      ids.map(function mapper (id): JSX.Element {
        return (
          <Item
            key={id}
            product={products.get(id) as TProduct}
          />
        )
      })
    }
  </div>
)

export default ListCart
