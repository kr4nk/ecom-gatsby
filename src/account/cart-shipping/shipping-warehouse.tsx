import { connect } from 'react-redux'

import {
  getProductsTotalCost,
  getWarehouse,
  getFieldFromWarehouseToCustom
} from '../../redux/selectors/user-cart'

import { selectCombobox } from '../../redux/actions/fields'

import ShippingWarehouse from '../common/shipping-warehouse'

import {
  ReduxState,
  Dispatch
} from '../../types/common'

import {
  TWarehouse,
  TCartShipping
} from '../../types/account'

import {
  CHECKED,
  PATH
} from '../../redux/selector-consts'

interface OwnProps {
  params: TCartShipping;
  type: string;
  name: string;
}

interface StateProps {
  subtotal: number;
  warehouse?: TWarehouse;
  isToCustom: boolean;
}

interface DispatchProps {
  onClick: React.MouseEventHandler;
}

const mapStateToProps = (state: ReduxState): StateProps => ({
  subtotal: getProductsTotalCost(state),
  warehouse: getWarehouse(state),
  isToCustom: getFieldFromWarehouseToCustom(state).get(CHECKED)
})

function mapDispatchToProps (
  dispatch: Dispatch,
  { params, type, name }: OwnProps
): DispatchProps {
  return {
    onClick (): void {
      dispatch(
        selectCombobox({
          path: params.get(PATH),
          value: type,
          name
        })
      )
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ShippingWarehouse)
