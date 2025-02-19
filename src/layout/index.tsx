import * as React from 'react'
import { connect } from 'react-redux'
import { ToastContainer } from 'react-toastify'

import { isBrowser } from '../utils/isbrowser'
import { useLocation } from '../utils/use-location'

import {
  ROLE_ADMIN,
  ROLE_GUEST,
  ROLE_MANAGER,
  ROLE_PENDING,
  ROLE_UNREGISTERED,
  ROLE_USER
} from '../const/roles'

import {
  getIsError,
  getIsFetching,
  getIsLoggedIn,
  getUserRole
} from '../redux/selectors/user'

import { getUser } from '../redux/actions/user'

import Head from './head'

import AdminLayout from './admin-layout'
import DefaultLayout from './default-layout'
import EmptyLayout from './empty-layout'
import GuestLayout from './guest-layout'
import Loading from './loading'
import ManagerLayout from './manager-layout'
import UserLayout from './user-layout'

import { ReduxState } from '../types/common'

interface LayoutSwitchProps {
  isFetching: boolean;
  isLoggedIn: boolean;
  children?: React.ReactNode;
  role: number;
}

function LayoutSwitch (props: LayoutSwitchProps): JSX.Element {
  if (props.isFetching) {
    return (
      <Loading />
    )
  }

  if (props.isLoggedIn) {
    switch (props.role) {
      case ROLE_UNREGISTERED:
      case ROLE_PENDING:
        return (
          <EmptyLayout>
            { props.children }
          </EmptyLayout>
        )

      case ROLE_GUEST:
        return (
          <GuestLayout>
            { props.children }
          </GuestLayout>
        )

      case ROLE_USER:
        return (
          <UserLayout>
            { props.children }
          </UserLayout>
        )

      case ROLE_MANAGER:
        return (
          <ManagerLayout>
            { props.children }
          </ManagerLayout>
        )

      case ROLE_ADMIN:
        return (
          <AdminLayout>
            { props.children }
          </AdminLayout>
        )

      default:
        break
    }
  }

  return (
    <DefaultLayout>
      { props.children }
    </DefaultLayout>
  )
}

const LayoutSwitchMemoized = React.memo(LayoutSwitch)

interface StateProps {
  isFetching: boolean;
  isLoggedIn: boolean;
  error: boolean;
  role: number;
}

interface DispatchProps {
  getUser (pathname?: string): void;
}

interface OwnProps {
  common?: boolean;
  children?: React.ReactNode;
  title: string;
  description: string;
  keywords: string;
  canonical?: string;
}

function Layout (props: OwnProps & StateProps & DispatchProps): JSX.Element {
  const { location } = useLocation()

  const [ , setRequested ] = React.useState(false)

  React.useEffect(
    function loadData (): void {
      if (isBrowser) {
        setRequested(function setRequested (requested): boolean {
          if (
            !requested &&
            !props.error &&
            !props.common &&
            !props.isLoggedIn &&
            !props.isFetching
          ) {
            props.getUser(location.pathname)

            return true
          }

          return requested
        })
      }
    }, [ props, location.pathname ]
  )

  return (
    <>
      <ToastContainer />

      <Head
        title={props.title}
        description={props.description}
        keywords={props.keywords}
        canonical={props.canonical}
      />

      <LayoutSwitchMemoized
        isFetching={props.isFetching}
        isLoggedIn={props.isLoggedIn}
        role={props.role}
      >
        { props.children }
      </LayoutSwitchMemoized>
    </>
  )
}

const mapStateToProps = (state: ReduxState): StateProps => ({
  isFetching: getIsFetching(state),
  isLoggedIn: getIsLoggedIn(state),
  error: getIsError(state),
  role: getUserRole(state)
})

const mapDispatchToProps: DispatchProps = {
  getUser
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Layout)
