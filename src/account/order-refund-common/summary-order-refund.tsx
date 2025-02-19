import { connect } from 'react-redux'

import {
  getRefundData,
  getRefundTaxes,
  getRefundProductsCost,
  getRefundTotalCost
} from '../../redux/selectors/user-order'

import SummaryOrderRefund from '../common/summary-order-refund'

import { ReduxState } from '../../types/common'

import {
  PRODUCTS_COST,
  TAXES_VALUE,
  TOTAL_COST
} from '../../redux/selector-consts'

interface OwnProps {
  index: number;
}

interface StateProps {
  productsCost: number;
  taxesValue: number;
  totalCost: number;
}

const mapStateToProps = (state: ReduxState, { index }: OwnProps): StateProps => {
  if (index !== -1) {
    const refund = getRefundData(state, index)

    return {
      productsCost: refund.get(PRODUCTS_COST),
      taxesValue: refund.get(TAXES_VALUE),
      totalCost: refund.get(TOTAL_COST)
    }
  }

  return {
    productsCost: getRefundProductsCost(state),
    taxesValue: getRefundTaxes(state),
    totalCost: getRefundTotalCost(state)
  }
}

export default connect(
  mapStateToProps
)(SummaryOrderRefund)
