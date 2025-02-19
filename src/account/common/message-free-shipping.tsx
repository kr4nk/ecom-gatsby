import * as React from 'react'

import * as userCart from '../../styles/user-cart.module.css'

const MessageFreeShipping = (): JSX.Element => (
  <div className={userCart.messageFreeShipping}>
    Free shipping on all orders over $4,500.00
  </div>
)

export default MessageFreeShipping
