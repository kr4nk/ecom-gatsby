import { connect } from 'react-redux'

import {
  paginationToBegin,
  paginationToEnd,
  paginationGoNext,
  paginationGoBack
} from '../../redux/actions/fields'

import Pagination from '../../components/common/pagination'

import { Dispatch } from '../../types/common'

import {
  ITEMS,
  PRODUCTS,
  CATEGORY
} from '../../redux/selector-consts'

const path = ['userCategories']

interface OwnProps {
  categoryId: string;
}

interface DispatchProps {
  toBegin(): void;
  toEnd(): void;
  goBack(): void;
  goNext(): void;
}

const getProductsList = (categoryId: string): string[] =>
  [ITEMS, categoryId, PRODUCTS]

const mapDispatchToProps = (dispatch: Dispatch, { categoryId }: OwnProps): DispatchProps => ({
  toBegin (): void {
    dispatch(
      paginationToBegin({
        path,
        paginationPath: [CATEGORY]
      })
    )
  },
  toEnd (): void {
    dispatch(
      paginationToEnd({
        path,
        listPath: getProductsList(categoryId),
        paginationPath: [CATEGORY]
      })
    )
  },
  goBack (): void {
    dispatch(
      paginationGoBack({
        path,
        paginationPath: [CATEGORY]
      })
    )
  },
  goNext (): void {
    dispatch(
      paginationGoNext({
        path,
        listPath: getProductsList(categoryId),
        paginationPath: [CATEGORY]
      })
    )
  }
})

export default connect(
  null,
  mapDispatchToProps
)(Pagination)
