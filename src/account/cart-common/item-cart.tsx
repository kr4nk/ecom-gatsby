import { connect } from 'react-redux'

import { getManufacturersItems } from '../../redux/selectors/user-manufacturers'

import ItemCart from '../common/item-cart'

import {
  TManufacturer,
  TProduct
} from '../../types/account'

import { ReduxState } from '../../types/common'

import { MANUFACTURER_ID } from '../../redux/selector-consts'

interface StateProps {
  manufacturer: TManufacturer;
}

interface OwnProps {
  product: TProduct;
}

const mapStateToProps = (state: ReduxState, { product }: OwnProps): StateProps => ({
  manufacturer: getManufacturersItems(state)
    .get(product.get(MANUFACTURER_ID)) as TManufacturer
})

export default connect(
  mapStateToProps
)(ItemCart)
