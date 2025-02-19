import * as React from 'react'

import ItemOrders from './item-orders'

import Spinner from '../../components/common/spinner'

import * as tableResponsive from '../../styles/table-responsive.module.css'

import { TImmutableIds } from '../../types/common'
import { TOrders, TOrder } from '../../types/account'

interface OwnProps {
  isFetching: boolean;
  ids: TImmutableIds;
  items: TOrders;
}

const ListOrders = ({ ids, items, isFetching }: OwnProps): JSX.Element => (
  <div className={tableResponsive.tableBody}>
    {
      // eslint-disable-next-line @getify/proper-arrows/return
      isFetching
        ? (
          <Spinner />
        )
        : ids.map(function mapper (id): JSX.Element {
          return (
            <ItemOrders
              key={id}
              order={items.get(id) as TOrder}
            />
          )
        })
    }
  </div>
)

export default ListOrders
