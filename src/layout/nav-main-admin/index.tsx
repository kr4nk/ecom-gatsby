import * as React from 'react'

import NavMainCommon from '../nav-main-common'

import SvgDashboard from '../../components/svg/dashboard'
import SvgTool from '../../components/svg/tool'
import SvgUser from '../../components/svg/user'
import SvgUserNew from '../../components/svg/user-new'

import { NavLink } from '../../types/common'

const links: NavLink[] = [
  { link: '/admin', title: 'Go To Admin Dashboard', text: 'Admin Dashboard', Icon: SvgDashboard },
  { link: '/admin/tools', title: 'Go To Admin Tools', text: 'Tools', Icon: SvgTool },
  { link: '/admin/users', title: 'Go To Users', text: 'Users', Icon: SvgUser },
  { link: '/admin/warehouses', title: 'Go To Warehouses', text: 'Warehouses', Icon: SvgDashboard },
  { link: '/admin/user/new', title: 'Create New User', text: 'New User', Icon: SvgUserNew }
]

function NavMainAdmin (): JSX.Element {
  return (
    <NavMainCommon
      links={links}
      enableLogout
    />
  )
}

export default React.memo(NavMainAdmin)
