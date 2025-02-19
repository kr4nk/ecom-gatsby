import * as React from 'react'

import SvgMinus from '../../components/svg/minus'
import SvgPlus from '../../components/svg/plus'

import BadgeStatus from './badge-status'

import * as userOrder from '../../styles/user-order.module.css'

interface StateProps {
  disabled: boolean;
  isOpen: boolean;
  status: string;
  children: React.ReactElement;
}

interface DispatchProps {
  onClick: React.MouseEventHandler;
}

const ButtonRefundExpand = ({
  disabled,
  isOpen,
  status,
  // eslint-disable-next-line @getify/proper-arrows/params
  children,
  onClick
}: StateProps & DispatchProps): JSX.Element => (
  <button
    className={userOrder.refundExpand}
    disabled={disabled}
    onClick={onClick}
    type='button'
  >
    <div>
      { children }
    </div>

    <BadgeStatus status={status} />

    <div className={userOrder.refundExpandIcon}>
      {
        // eslint-disable-next-line @getify/proper-arrows/return
        isOpen
          ? (<SvgMinus />)
          : (<SvgPlus />)
      }
    </div>
  </button>
)

export default ButtonRefundExpand
