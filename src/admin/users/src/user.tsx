import * as React from 'react'
import { Link } from 'gatsby'
import * as dayjs from 'dayjs'

import { getRoleName } from '../../../const/roles'

import * as tableResponsive from '../../../styles/table-responsive.module.css'

import { TImmutableAdminUser } from '../../../types/admin'

import {
  FIRST_NAME,
  LAST_NAME,
  ID,
  CREATED_AT,
  ROLE
} from '../../../redux/selector-consts'

interface OwnProps {
  user: TImmutableAdminUser;
}

function User ({ user }: OwnProps): JSX.Element {
  const createdAt = React.useMemo(
    function setCreatedAt (): dayjs.Dayjs {
      return dayjs(user.get(CREATED_AT))
    }, [ user ]
  )

  return (
    <Link
      title={`User ${user.get(FIRST_NAME)} ${user.get(LAST_NAME)}`}
      to={`/admin/user/${user.get(ID)}`}
      className={tableResponsive.tableLink}
    >
      <div className={tableResponsive.tableRowResponsive}>
        <time
          data-title='Created at'
          className={tableResponsive.tableCell}
          dateTime={createdAt.toISOString()}
        >
          { createdAt.format('LL') }
        </time>

        <div
          className={tableResponsive.tableCell}
          data-title='Role'
        >
          { getRoleName(user.get(ROLE)) }
        </div>

        <div
          className={tableResponsive.tableCell}
          data-title='Full name'
        >
          { user.get(FIRST_NAME) } { user.get(LAST_NAME) }
        </div>
      </div>
    </Link>
  )
}

export default React.memo(User)
