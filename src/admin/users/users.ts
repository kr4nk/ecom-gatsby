import { connect } from 'react-redux'

import {
  getIsFetching,
  getUsersIds,
  getUsersItems
} from '../../redux/selectors/admin-users'

import UserList from './src/users'

import {
  ReduxState,
  TImmutableIds
} from '../../types/common'

import {
  TImmutableAdminUsers
} from '../../types/admin'

interface StateProps {
  isFetching: boolean;
  ids: TImmutableIds;
  items: TImmutableAdminUsers;
}

const mapStateToProps = (state: ReduxState): StateProps => ({
  isFetching: getIsFetching(state),
  ids: getUsersIds(state),
  items: getUsersItems(state)
})

export default connect(
  mapStateToProps
)(UserList)
