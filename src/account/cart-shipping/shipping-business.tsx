import { connect } from 'react-redux'

import {
  getProductsTotalCost,
  getBusinessAddress
} from '../../redux/selectors/user-cart'

import { selectCombobox } from '../../redux/actions/fields'

import ShippingBusiness from '../common/shipping-business'

import { ReduxState, Dispatch } from '../../types/common'
import { TCartShipping } from '../../types/account'

import { PATH } from '../../redux/selector-consts'

interface StateProps {
  subtotal: number;
  address: string;
  cost: string;
}

interface DispatchProps {
  onClick: React.MouseEventHandler;
}

interface OwnProps {
  params: TCartShipping;
  type: string;
  name: string;
}

const mapStateToProps = (state: ReduxState): StateProps => ({
  subtotal: getProductsTotalCost(state),
  address: getBusinessAddress(state),
  cost: 'Submit order to calculate'
})

const mapDispatchToProps = (dispatch: Dispatch, {
  params,
  type,
  // eslint-disable-next-line @getify/proper-arrows/params
  name
}: OwnProps): DispatchProps => ({
  onClick (): void {
    dispatch(
      selectCombobox({
        path: params.get(PATH),
        value: type,
        name
      })
    )
  }
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ShippingBusiness)
