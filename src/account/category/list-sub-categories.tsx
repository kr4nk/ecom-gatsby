import { connect } from 'react-redux'

import { getCategoriesItems } from '../../redux/selectors/user-categories'

import ListSubCategories from '../common/list-sub-categories'

import { ReduxState } from '../../types/common'
import { TCategories } from '../../types/account';

interface StateProps {
  items: TCategories;
}

const mapStateToProps = (state: ReduxState): StateProps => ({
  items: getCategoriesItems(state)
})

export default connect(
  mapStateToProps
)(ListSubCategories)
