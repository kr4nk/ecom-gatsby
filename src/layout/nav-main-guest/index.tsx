import * as React from 'react'

import NavMainCommon from '../nav-main-common'

import SvgDocDownload from '../../components/svg/doc-download'

import { NavLink } from '../../types/common'

const links: NavLink[] = [
  { link: '/account/downloads', title: 'Go To Downloads', text: 'Downloads', Icon: SvgDocDownload }
]

function NavMainGuest (): JSX.Element {
  return (
    <NavMainCommon
      links={links}
      enableLogout
    />
  )
}

export default React.memo(NavMainGuest)
