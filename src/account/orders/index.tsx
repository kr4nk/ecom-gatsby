import * as React from 'react'
import { connect } from 'react-redux'

import {
  getIsFetching,
  getOrdersIds,
  getListPast,
  getListPageSize
} from '../../redux/selectors/user-orders'

import ListHeader from '../common/header-orders'
import ListOrders from './list-orders'
import Pagination from './pagination'

import * as layout from '../../styles/layout.module.css'

import { ReduxState, TImmutableIds } from '../../types/common'

interface StateProps {
  isFetching: boolean;
  ids: TImmutableIds;
  past: number;
  pageSize: number;
}

function Orders ({ isFetching, ids, past, pageSize }: StateProps): JSX.Element {
  const list = React.useMemo(
    function setList (): TImmutableIds {
      return ids.slice(past, past + pageSize)
    }, [ past, ids, pageSize ]
  )

  return (
    <div className={layout.container}>
      <div className={layout.content}>
        <h1 className={layout.pageTitle} >
          Orders
        </h1>

        <section className={layout.section}>
          <Pagination
            position='top'
            disabled={isFetching}
            past={past}
            total={ids.size}
            pageSize={pageSize}
          />

          <ListHeader />

          <ListOrders
            isFetching={isFetching}
            ids={list}
          />

          <Pagination
            disabled={isFetching}
            past={past}
            total={ids.size}
            pageSize={pageSize}
          />
        </section>
      </div>
    </div>
  )
}

const mapStateToProps = (state: ReduxState): StateProps => ({
  isFetching: getIsFetching(state),
  ids: getOrdersIds(state),
  past: getListPast(state),
  pageSize: getListPageSize(state)
})

export default connect(
  mapStateToProps
)(Orders)
