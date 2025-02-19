import { connect } from 'react-redux'

import { getCategoriesItems } from '../../redux/selectors/user-categories'

import Breadcrumbs from '../common/breadcrumbs-categories'

import { ReduxState } from '../../types/common'
import { TCategories } from '../../types/account'

interface StateProps {
  categories: TCategories;
}

const mapStateToProps = (state: ReduxState): StateProps => ({
  categories: getCategoriesItems(state)
})

export default connect(
  mapStateToProps
)(Breadcrumbs)
