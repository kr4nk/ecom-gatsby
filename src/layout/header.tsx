import * as React from 'react'
import { connect } from 'react-redux'

import {
  ROLE_ADMIN,
  ROLE_GUEST,
  ROLE_MANAGER,
  ROLE_PENDING,
  ROLE_UNREGISTERED,
  ROLE_USER
} from '../const/roles'

import {
  getIsLoggedIn,
  getUserRole
} from '../redux/selectors/user'

import AdminHeader from './admin-header'
import DefaultHeader from './default-header'
import EmptyHeader from './empty-header'
import GuestHeader from './guest-header'
import ManagerHeader from './manager-header'
import UserHeader from './user-header'

import { ReduxState } from '../types/common'

interface StateProps {
  isLoggedIn: boolean;
  role: number;
}

function Header ({ isLoggedIn, role }: StateProps): JSX.Element {
  if (isLoggedIn) {
    switch (role) {
      case ROLE_ADMIN:
        return (<AdminHeader />)

      case ROLE_MANAGER:
        return (<ManagerHeader />)

      case ROLE_USER:
        return (<UserHeader />)

      case ROLE_GUEST:
        return <GuestHeader />

      case ROLE_PENDING:
      case ROLE_UNREGISTERED:
        return (<EmptyHeader />)
      default:
        break
    }
  }

  return (<DefaultHeader />)
}

const mapStateToProps = (state: ReduxState): StateProps => ({
  isLoggedIn: getIsLoggedIn(state),
  role: getUserRole(state)
})

export default connect(
  mapStateToProps
)(Header)
