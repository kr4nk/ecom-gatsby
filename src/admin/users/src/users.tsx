import * as React from 'react'

import Spinner from '../../../components/common/spinner'

import User from './user'

import * as tableResponsive from '../../../styles/table-responsive.module.css'

import { TImmutableIds } from '../../../types/common'
import { TImmutableAdminUsers, TImmutableAdminUser } from '../../../types/admin'

interface StateProps {
  isFetching: boolean;
  ids: TImmutableIds;
  items: TImmutableAdminUsers;
}

export default function UserList ({ isFetching, ids, items }: StateProps): JSX.Element {
  return (
    <div className={tableResponsive.tableBody}>
      {
        isFetching
          ? (<Spinner />)
          : (
            ids.map(function mapper (id): JSX.Element {
              return (
                <User
                  key={id}
                  user={items.get(id) as TImmutableAdminUser}
                />
              )
            })
          )
      }
    </div>
  )
}
