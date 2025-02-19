import * as React from 'react'
import classnames from 'classnames'

import ButtonReturn from '../../components/common/button-return'

import ButtonRefundOpen from '../order/button-refund-open'

import * as layout from '../../styles/layout.module.css'
import * as utility from '../../styles/utility.module.css'

interface OwnProps {
  isPaid: boolean;
}

const ControlsOrder = ({ isPaid }: OwnProps): JSX.Element => (
  <div
    className={
      classnames(
        layout.controls,
        utility.df,
        utility.jcsb
      )
    }
  >
    <ButtonReturn />

    {
      // eslint-disable-next-line @getify/proper-arrows/return
      isPaid
        ? (<ButtonRefundOpen />)
        : (<></>)
    }
  </div>
)

export default ControlsOrder
