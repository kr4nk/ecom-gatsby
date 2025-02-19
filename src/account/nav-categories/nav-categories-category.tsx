import { connect } from 'react-redux'

import { getCategoriesItems } from '../../redux/selectors/user-categories'

import NavCategoriesCategory from '../common/nav-categories-category'

import { ReduxState } from '../../types/common'
import { TCategories } from '../../types/account'

interface StateProps {
  items: TCategories;
}

const mapStateToProps = (state: ReduxState): StateProps => ({
  items: getCategoriesItems(state)
})

export default connect(
  mapStateToProps
)(NavCategoriesCategory)
