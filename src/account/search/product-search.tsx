import { connect } from 'react-redux'

import { getManufacturersItems } from '../../redux/selectors/user-manufacturers'

import ProductSearch from '../common/product-search'

import { ReduxState } from '../../types/common'

import {
  TProduct,
  TManufacturer,
  TManufacturers
} from '../../types/account'

import { MANUFACTURER_ID } from '../../redux/selector-consts'

interface StateProps {
  manufacturers: TManufacturers;
}

interface OwnProps {
  product: TProduct;
  search: string;
}

interface MergedProps {
  manufacturer: TManufacturer;
  product: TProduct;
  search: string;
}

const mapStateToProps = (state: ReduxState): StateProps => ({
  manufacturers: getManufacturersItems(state)
})

function mergeProps (
  { manufacturers }: StateProps,
  __: null, { product, search }: OwnProps
): MergedProps {
  return {
    product,
    search,
    manufacturer: manufacturers.get(product.get(MANUFACTURER_ID)) as TManufacturer
  }
}

export default connect(
  mapStateToProps,
  null,
  mergeProps
)(ProductSearch)
