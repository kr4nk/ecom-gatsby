import * as React from 'react'
import classnames from 'classnames'

import ButtonSendOrder from '../cart-common/button-send-order'
import ButtonPrintOrder from '../cart-common/button-print-order'

import * as actions from '../../styles/actions.module.css'
import * as utility from '../../styles/utility.module.css'

const ActionsCart = (): JSX.Element => (
  <div
    className={
      classnames(
        actions.actions,
        utility.df,
        utility.jcsb
      )
    }
  >
    <ButtonPrintOrder />

    <ButtonSendOrder />
  </div>
)

export default ActionsCart
