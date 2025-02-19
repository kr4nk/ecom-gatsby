import { connect } from 'react-redux'

import { getManufacturersItems } from '../../redux/selectors/user-manufacturers'

import ContentProduct from '../common/content-product'

import {
  ReduxState,
  TDangerHTML
} from '../../types/common'

import {
  TProduct,
  TManufacturers,
  TManufacturer
} from '../../types/account'

import {
  DESC_SHORT,
  MANUFACTURER_ID
} from '../../redux/selector-consts'

interface OwnProps {
  product: TProduct;
}

interface StateProps {
  manufacturers: TManufacturers;
}

interface MergedProps {
  product: TProduct;
  description: TDangerHTML;
  manufacturer: TManufacturer;
}

const mapStateToProps = (state: ReduxState): StateProps => ({
  manufacturers: getManufacturersItems(state)
})

const mergeProps = ({ manufacturers }: StateProps, __: null, { product }: OwnProps): MergedProps => ({
  product,
  description: {
    // eslint-disable-next-line @getify/proper-arrows/return
    __html: product !== undefined
      ? product.get(DESC_SHORT)
      : ''
  },
  manufacturer: manufacturers.get(product.get(MANUFACTURER_ID)) as TManufacturer
})

export default connect(mapStateToProps, null, mergeProps)(ContentProduct)
