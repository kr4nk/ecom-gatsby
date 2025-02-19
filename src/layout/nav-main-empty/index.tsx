import * as React from 'react'

import NavMainCommon from '../nav-main-common'

import { NavLink } from '../../types/common'

const links: NavLink[] = []

function NavMainEmpty (): JSX.Element {
  return (
    <NavMainCommon
      links={links}
      enableLogout
    />
  )
}

export default React.memo(NavMainEmpty)
