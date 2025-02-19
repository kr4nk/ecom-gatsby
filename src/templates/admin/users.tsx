import * as React from 'react'
import { connect } from 'react-redux'

import { isBrowser } from '../../utils/isbrowser'

import { ROLE_ADMIN } from '../../const/roles'

import { getUserRole } from '../../redux/selectors/user'

import { getAdminUsers } from '../../redux/actions/admin-users'

import Layout from '../../layout'

import Main from '../../admin/users'

import { ReduxState } from '../../types/common'

interface StateProps {
  role: number;
}

interface DispatchProps {
  getAdminUsers (direction?: string, lastKey?: string): void;
}

function Users ({ role, getAdminUsers }: StateProps & DispatchProps): JSX.Element {
  React.useEffect(
    function loadData (): void {
      if (
        isBrowser &&
        role === ROLE_ADMIN
      ) {
        getAdminUsers()
      }
    }, [ role, getAdminUsers ]
  )

  return (
    <Layout
      title='Users'
      description=' '
      keywords=' '
    >
      {
        role === ROLE_ADMIN
          ? <Main />
          : <></>
      }
    </Layout>
  )
}

const mapStateToProps = (state: ReduxState): StateProps => ({
  role: getUserRole(state)
})

const mapDispatchToProps: DispatchProps = {
  getAdminUsers
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Users)
