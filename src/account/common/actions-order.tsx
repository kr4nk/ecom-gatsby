import * as React from 'react'
import classnames from 'classnames'

import ButtonSendOrder from '../order/button-send-order'
import ButtonPrintOrder from '../order/button-print-order'
import ButtonCancelOrder from '../order/button-cancel-order'

import * as actions from '../../styles/actions.module.css'
import * as utility from '../../styles/utility.module.css'

import { TOrder } from '../../types/account'

import { IS_PAID } from '../../redux/selector-consts'

interface OwnProps {
  order: TOrder;
}

const ActionsOrder = ({ order }: OwnProps): JSX.Element => (
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

    {
      // eslint-disable-next-line @getify/proper-arrows/return
      order.get(IS_PAID)
        ? (<></>)
        : (<ButtonCancelOrder />)
    }
  </div>
)

export default ActionsOrder
