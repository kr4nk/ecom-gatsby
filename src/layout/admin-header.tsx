import { Link } from 'gatsby'
import * as React from 'react'
import { connect } from 'react-redux'

import { getUser } from '../redux/selectors/user'

import SvgLogoHz from '../components/svg/logo-hz'

import * as header from '../styles/header.module.css'
import * as layoutPage from '../styles/layout-page.module.css'

import { ReduxState } from '../types/common'

import {
  FIRST_NAME,
  LAST_NAME
} from '../redux/selector-consts'

interface StateProps {
  firstName: string;
  lastName: string;
}

const AdminHeader = (props: StateProps): JSX.Element => (
  <header>
    <div className={layoutPage.container}>
      <div className={header.content}>
        <Link
          title='Admin Dashboard'
          to='/admin'
          className={header.logo}
          aria-label='logo link to Admin Dashboard'
        >
          <SvgLogoHz />
        </Link>

        <div className={header.actions}>
          <span className={header.user}>
            { props.firstName } { props.lastName }
          </span>
        </div>
      </div>
    </div>
  </header>
)

const mapStateToProps = (state: ReduxState): StateProps => ({
  firstName: getUser(state).get(FIRST_NAME),
  lastName: getUser(state).get(LAST_NAME)
})

export default connect(
  mapStateToProps
)(AdminHeader)
