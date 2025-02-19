import { connect } from 'react-redux'

import { getProductVersionDiscount } from '../../redux/selectors/user'
import { getProductVersionQuantity } from '../../redux/selectors/user-cart'

import {
  setVersionValue,
  removeCartItem
} from '../../redux/actions/user-cart'

import VersionCart from '../common/version-cart'

import { TProductVersion } from '../../types/account'
import { ReduxState } from '../../types/common'

import {
  ID
} from '../../redux/selector-consts'

interface OwnProps {
  productId: string;
  version: TProductVersion;
}

interface StateProps {
  value: number;
  discount: number;
}

interface DispatchProps {
  setVersionValue(productId: string, versionId: string, value: number): void;
  removeCartItem(productId: string, versionId: string): void;
}

const mapStateToProps = (state: ReduxState, { productId, version }: OwnProps): StateProps => ({
  value: getProductVersionQuantity(state, {
    productId,
    versionId: version.get(ID)
  }),

  discount: getProductVersionDiscount(state, version.get(ID))
})

const mapDispatchToProps: DispatchProps = {
  setVersionValue,
  removeCartItem
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(VersionCart)
