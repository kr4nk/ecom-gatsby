import * as React from 'react'
import { Link } from 'gatsby'
import classnames from 'classnames'

import ControlsReturn from '../../components/common/controls-return'

import * as layout from '../../styles/layout.module.css'
import * as userCart from '../../styles/user-cart.module.css'
import * as buttons from '../../styles/buttons.module.css'

const Empty = (): JSX.Element => (
  <div className={layout.container}>
    <ControlsReturn />

    <div className={layout.content}>
      <h1 className={layout.sectionTitle}>
        Your Cart
      </h1>

      <div className={userCart.cartEmpty}>
        <div className={userCart.messageCartEmpty}>
          Cart is empty
        </div>

        <div className={userCart.cartEmptyButton}>
          <Link
            to='/account'
            className={
              classnames(
                buttons.button,
                buttons.buttonPrimary,
                buttons.buttonSmall
              )
            }
          >
            Continue shopping
          </Link>
        </div>
      </div>
    </div>

    <ControlsReturn />
  </div>
)

export default Empty
