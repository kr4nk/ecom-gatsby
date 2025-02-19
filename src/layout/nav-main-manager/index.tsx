import * as React from 'react'

import NavMainCommon from '../nav-main-common'

import SvgDashboard from '../../components/svg/dashboard'
import SvgBox from '../../components/svg/box'
import SvgMoney from '../../components/svg/money'
import SvgUser from '../../components/svg/user'
import SvgTag from '../../components/svg/tag'
import SvgList from '../../components/svg/list'
import SvgFactory from '../../components/svg/factory'
import SvgCertificate from '../../components/svg/certificate'
import SvgNew from '../../components/svg/new'
import SvgUserNew from '../../components/svg/user-new'
import SvgDocUpload from '../../components/svg/doc-upload'

import { NavLink } from '../../types/common'

const links: NavLink[] = [
  { link: '/manager', title: 'Go To Manager Dashboard', text: 'Dashboard', Icon: SvgDashboard },
  { link: '/manager/products', title: 'Go To Products', text: 'Products', Icon: SvgBox },
  { link: '/manager/orders/all', title: 'Go To Orders', text: 'Orders', Icon: SvgMoney },
  { link: '/manager/users', title: 'Go To Users', text: 'Users', Icon: SvgUser },
  { link: '/manager/groups', title: 'Go To Groups', text: 'Groups', Icon: SvgTag },
  { link: '/manager/categories', title: 'Go To Categories', text: 'Categories', Icon: SvgList },
  { link: '/manager/manufacturers', title: 'Go To Manufacturers', text: 'Manufacturers', Icon: SvgFactory },
  { link: '/manager/certificates', title: 'Go To Certificates', text: 'Certificates', Icon: SvgCertificate },
  { link: '/manager/product/new', title: 'Create New Product', text: 'New Product', Icon: SvgNew },
  { link: '/manager/user/new', title: 'Create New User', text: 'New User', Icon: SvgUserNew },
  { link: '/manager/uploads', title: 'Go To Uploads', text: 'Uploads', Icon: SvgDocUpload }
]

function NavMainManager (): JSX.Element {
  return (
    <NavMainCommon
      links={links}
      enableLogout
    />
  )
}

export default React.memo(NavMainManager)
