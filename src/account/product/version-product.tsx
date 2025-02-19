import { connect } from 'react-redux'

import { getProductVersionDiscount } from '../../redux/selectors/user'
import { getProductVersionQuantity } from '../../redux/selectors/user-cart'

import {
  addCartItem,
  setVersionValue
} from '../../redux/actions/user-cart'

import VersionProduct from '../common/version-product'

import { ReduxState, Dispatch } from '../../types/common'
import { TProductVersion } from '../../types/account'

import {
  PRODUCT_ID,
  ID
} from '../../redux/selector-consts'

interface OwnProps {
  version: TProductVersion;
}

interface StateProps {
  value: number;
  discount: number;
}

interface DispatchProps {
  addCartItem: React.MouseEventHandler;
  onChange(value: number): void;
}

const mapStateToProps = (state: ReduxState, { version }: OwnProps): StateProps => ({
  value: getProductVersionQuantity(state, {
    productId: version.get(PRODUCT_ID),
    versionId: version.get(ID)
  }),

  discount: getProductVersionDiscount(state, version.get(ID))
})

const mapDispatchToProps = (dispatch: Dispatch, { version }: OwnProps): DispatchProps => ({
  addCartItem (): void {
    dispatch(
      addCartItem(
        version.get(PRODUCT_ID),
        version.get(ID)
      )
    )
  },
  onChange (value: number): void {
    dispatch(
      setVersionValue(
        version.get(PRODUCT_ID),
        version.get(ID),
        value
      )
    )
  }
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(VersionProduct)
