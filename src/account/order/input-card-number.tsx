import * as React from 'react'
import { connect } from 'react-redux'
import classnames from 'classnames'

import {
  getIsFetching,
  getFieldCardNumber,
  getCardType
} from '../../redux/selectors/user-order'

import Input from '../../components/fields/input'

import SvgCardVisa from '../../components/svg/card-visa'
import SvgCardMastercard from '../../components/svg/card-mastercard'
import SvgCardAmex from '../../components/svg/card-amex'
import SvgCardDinner from '../../components/svg/card-dinner'
import SvgCardDiscover from '../../components/svg/card-discover'
import SvgCardJcb from '../../components/svg/card-jcb'
import SvgCardUnionpay from '../../components/svg/card-unionpay'

import * as grid from '../../styles/grid.module.css'
import * as fields from '../../styles/fields.module.css'

import { ReduxState, TImmutableInput } from '../../types/common'

interface StateProps {
  id: string;
  name: string;
  inputMode: string;
  labelText: string;
  invalidMessage: string;
  placeholder: string;
  iconClassName: string;
  className: string;
  disabled: boolean;
  params: TImmutableInput;
  icon: React.ReactNode;
}

const mapCards: {
  [key: string]: React.FunctionComponent;
} = {
  'visa': SvgCardVisa,
  'mastercard': SvgCardMastercard,
  'american-express': SvgCardAmex,
  'diners-club': SvgCardDinner,
  'discover': SvgCardDiscover,
  'jcb': SvgCardJcb,
  'unionpay': SvgCardUnionpay
}

const getCardIcon = (type: string): JSX.Element => {
  const Card = mapCards[type]

  return Card !== undefined
    ? (<Card />)
    : (<svg />)
}

const mapStateToProps = (state: ReduxState): StateProps => ({
  id: 'cardNumber',
  name: 'cardNumber',
  inputMode: 'number',
  labelText: 'Card Number *',
  invalidMessage: 'Please enter your card number',
  placeholder: '0000 0000 0000 0000',
  iconClassName: fields.iconPayment,
  className: classnames(
    fields.field,
    grid.colMd4
  ),
  disabled: getIsFetching(state),
  params: getFieldCardNumber(state),
  icon: getCardIcon(getCardType(state))
})

const InputCardNumber = connect(
  mapStateToProps
)(Input)

export default InputCardNumber
