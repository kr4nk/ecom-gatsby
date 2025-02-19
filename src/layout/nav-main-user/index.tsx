import * as React from 'react'

import NavMainCommon from '../nav-main-common'

// import SvgHome from '../../components/svg/home'
import SvgStore from '../../components/svg/store'
import SvgCart from '../../components/svg/cart'
// import SvgGrid from '../../components/svg/grid'
import SvgFactory from '../../components/svg/factory'
import SvgCertificate from '../../components/svg/certificate'
import SvgList from '../../components/svg/list'
import SvgBox from '../../components/svg/box'
import SvgDocDownload from '../../components/svg/doc-download'
import SvgUserCircle from '../../components/svg/user-circle'

import { NavLink } from '../../types/common'

const links: NavLink[] = [
  // { link: '/account', title: 'Go To Home', text: 'Home', Icon: SvgHome },
  { link: '/account', title: 'Go To Shop', text: 'Shop', Icon: SvgStore },
  { link: '/account/cart', title: 'Go To Cart', text: 'Cart', Icon: SvgCart },
  // TODO: { link: '/account/catalog', title: 'Go To Catalog', text: 'Catalog', Icon: SvgGrid },
  { link: '/account/categories', title: 'Go To Categories', text: 'Categories', Icon: SvgList },
  { link: '/account/manufacturers', title: 'Go To Manufacturers', text: 'Manufacturers', Icon: SvgFactory },
  { link: '/account/certificates', title: 'Go To Certificates', text: 'Certificates', Icon: SvgCertificate },
  { link: '/account/downloads', title: 'Go To Downloads', text: 'Downloads', Icon: SvgDocDownload },
  { link: '/account/orders', title: 'Go To Orders', text: 'Orders', Icon: SvgBox },
  { link: '/account/profile', title: 'Go To Profile', text: 'Profile', Icon: SvgUserCircle }
]

function NavMainUser (): JSX.Element {
  return (
    <NavMainCommon
      links={links}
      enableLogout
    />
  )
}

export default React.memo(NavMainUser)
