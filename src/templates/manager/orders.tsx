import * as React from 'react'
import { connect } from 'react-redux'

import { isBrowser } from '../../utils/isbrowser'

import { ROLE_MANAGER } from '../../const/roles'

import { getUserRole } from '../../redux/selectors/user'

import { getQuarterOfYear } from '../../redux/selectors/manager-orders'

import {
  getOrders,
  getOrdersByStatus
} from '../../redux/actions/manager-orders'

import Layout from '../../layout'

import Main from '../../manager/orders'

import { ReduxState } from '../../types/common'

interface StateProps {
  role: number;
  quarter: string;
}

interface DispatchProps {
  getOrders(quarter: string, direction?: string, lastKey?: string): void;
  getOrdersByStatus(status: string, direction?: string, lastKey?: string): void;
}

interface OwnProps {
  status: string;
}

function Orders ({ role, status, quarter, getOrders, getOrdersByStatus }: StateProps & DispatchProps & OwnProps): JSX.Element {
  const [ currentStatus, setStatus ] = React.useState('')

  React.useEffect(
    function loadData (): void {
      if (isBrowser) {
        setStatus(function setStatus (currentStatus): string {
          if (
            role === ROLE_MANAGER &&
            status !== undefined &&
            status !== currentStatus
          ) {
            status === 'all'
              ? getOrders(quarter)
              : getOrdersByStatus(status)

            return status
          }

          return currentStatus
        })
      }
    }, [ role, status, quarter, getOrders, getOrdersByStatus ]
  )

  return (
    <Layout
      title='Orders'
      description=' '
      keywords=' '
    >
      {
        role === ROLE_MANAGER
          ? (
            <Main
              status={currentStatus}
            />
          )
          : (<></>)
      }
    </Layout>
  )
}

function mapStateToProps (state: ReduxState): StateProps {
  return {
    role: getUserRole(state),
    quarter: getQuarterOfYear(state)
  }
}

const mapDispatchToProps: DispatchProps = {
  getOrders,
  getOrdersByStatus
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Orders)
