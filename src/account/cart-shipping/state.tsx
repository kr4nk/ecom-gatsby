import * as React from 'react'
import { connect } from 'react-redux'

import { COUNTRY_US } from '../../const/countries'

import { getFieldCountry } from '../../redux/selectors/user-cart'

import ComboboxStateUs from '../cart-common/combobox-state-us'
import ComboboxStateCanada from '../cart-common/combobox-state-canada'

import { ReduxState } from '../../types/common'

import { VALUE } from '../../redux/selector-consts'

interface StateProps {
  country: string;
}

function State ({ country }: StateProps): JSX.Element {
  return country === COUNTRY_US
    ? (
      <ComboboxStateUs />
    )
    : (
      <ComboboxStateCanada />
    )
}

const mapStateToProps = (state: ReduxState): StateProps => ({
  country: getFieldCountry(state)
    .get(VALUE)
})

export default connect(
  mapStateToProps
)(State)
