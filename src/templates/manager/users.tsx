import * as React from 'react'
import { connect } from 'react-redux'

import { isBrowser } from '../../utils/isbrowser'

import { ROLE_MANAGER } from '../../const/roles'

import { getUserRole } from '../../redux/selectors/user'

import { getUsersDashboard } from '../../redux/actions/manager-users'

import Layout from '../../layout'

import Main from '../../manager/users'

import { ReduxState } from '../../types/common'

interface StateProps {
  role: number;
}

interface DispatchProps {
  getUsersDashboard(): void;
}

function Users ({ role, getUsersDashboard }: StateProps & DispatchProps): JSX.Element {
  React.useEffect(
    function loadUsers (): void {
      if (
        isBrowser &&
        role === ROLE_MANAGER
      ) {
        getUsersDashboard()
      }
    }, [ role, getUsersDashboard ]
  )

  return (
    <Layout
      title='Users'
      description=' '
      keywords=' '
    >
      {
        role === ROLE_MANAGER
          ? (<Main />)
          : (<></>)
      }
    </Layout>
  )
}

function mapStateToProps (state: ReduxState): StateProps {
  return {
    role: getUserRole(state)
  }
}

const mapDispatchToProps: DispatchProps = {
  getUsersDashboard
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Users)
