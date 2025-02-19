import * as React from 'react'
import { connect } from 'react-redux'

import { isBrowser } from '../../utils/isbrowser'

import { ROLE_MANAGER } from '../../const/roles'

import { getUserRole } from '../../redux/selectors/user'

import { loadDashboard } from '../../redux/actions/manager-dashboard'

import Layout from '../../layout'

import Main from '../../manager/dashboard'

import { ReduxState } from '../../types/common'

interface StateProps {
  role: number;
}

interface DispatchProps {
  loadDashboard(): void;
}

function Dashboard ({ role, loadDashboard }: StateProps & DispatchProps): JSX.Element {
  React.useEffect(
    function loadData (): void {
      if (
        isBrowser &&
        role === ROLE_MANAGER
      ) {
        loadDashboard()
      }
    }, [ role, loadDashboard ]
  )

  return (
    <Layout
      title='Dashboard'
      description=' '
      keywords=' '
    >
      {
        role === ROLE_MANAGER
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
  loadDashboard
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard)
