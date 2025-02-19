import { connect } from 'react-redux'

import { getProductVersionDiscount } from '../../redux/selectors/user'
import { getProductVersionQuantity } from '../../redux/selectors/user-cart'

import {
  addCartItem,
  setVersionValue
} from '../../redux/actions/user-cart'

import VersionShop from '../common/version-shop'

import {
  TProductVersion
} from '../../types/account'

import {
  ReduxState,
  Dispatch
} from '../../types/common'

import { ID } from '../../redux/selector-consts'

interface OwnProps {
  productId: string;
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

const mapStateToProps = (state: ReduxState, { version, productId }: OwnProps): StateProps => ({
  value: getProductVersionQuantity(state, {
    productId,
    versionId: version.get(ID)
  }),

  discount: getProductVersionDiscount(state, version.get(ID))
})

const mapDispatchToProps = (dispatch: Dispatch, { version, productId }: OwnProps): DispatchProps => ({
  addCartItem (): void {
    dispatch(
      addCartItem(
        productId,
        version.get(ID)
      )
    )
  },
  onChange (value: number): void {
    dispatch(
      setVersionValue(
        productId,
        version.get(ID),
        value
      )
    )
  }
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(VersionShop)
