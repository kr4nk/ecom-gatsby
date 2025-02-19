import * as React from 'react'
import { connect } from 'react-redux'

import { ROLE_USER } from '../../const/roles'

import { getUserRole } from '../../redux/selectors/user'

import Layout from '../../layout'

import Main from '../../account/dashboard'

import { ReduxState } from '../../types/common'

interface StateProps {
  role: number;
}

const Dashboard = ({ role }: StateProps): JSX.Element => (
  <Layout
    title='Dashboard'
    description=' '
    keywords=' '
  >
    {
      // eslint-disable-next-line @getify/proper-arrows/return
      role === ROLE_USER
        ? (<Main />)
        : (<></>)
    }
  </Layout>
)

const mapStateToProps = (state: ReduxState): StateProps => ({
  role: getUserRole(state)
})

export default connect(
  mapStateToProps
)(Dashboard)
