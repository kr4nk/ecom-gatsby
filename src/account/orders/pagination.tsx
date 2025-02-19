import { connect } from 'react-redux'

import {
  paginationToBegin,
  paginationToEnd,
  paginationGoNext,
  paginationGoBack
} from '../../redux/actions/fields'

import Pagination from '../../components/common/pagination'

import { Dispatch } from '../../types/common'

const path = ['userOrders']

interface OwnProps {
  total: number;
}

interface DispatchProps {
  toBegin(): void;
  toEnd(): void;
  goBack(): void;
  goNext(): void;
}

const mapDispatchToProps = (dispatch: Dispatch, { total }: OwnProps): DispatchProps => ({
  toBegin (): void {
    dispatch(
      paginationToBegin({ path })
    )
  },
  toEnd (): void {
    dispatch(
      paginationToEnd({ path, total })
    )
  },
  goBack (): void {
    dispatch(
      paginationGoBack({ path })
    )
  },
  goNext (): void {
    dispatch(
      paginationGoNext({ path, total })
    )
  }
})

export default connect(
  null,
  mapDispatchToProps
)(Pagination)
