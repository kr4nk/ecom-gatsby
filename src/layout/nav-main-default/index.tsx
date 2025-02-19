import * as React from 'react'

import NavMainCommon from '../nav-main-common'

import SvgHome from '../../components/svg/home'
import SvgGrid from '../../components/svg/grid'
import SvgList from '../../components/svg/list'
import SvgFactory from '../../components/svg/factory'
import SvgCertificate from '../../components/svg/certificate'
import SvgDocDownload from '../../components/svg/doc-download'
import SvgEnvelopOpen from '../../components/svg/envelop-open'
import SvgLogin from '../../components/svg/login'
import SvgUserNew from '../../components/svg/user-new'

import { NavLink } from '../../types/common'

const links: NavLink[] = [
  { link: '/', title: 'Go To Home', text: 'Home', Icon: SvgHome },
  { link: '/catalog', title: 'Go To Catalog', text: 'Catalog', Icon: SvgGrid },
  { link: '/categories', title: 'Go To Categories', text: 'Categories', Icon: SvgList },
  { link: '/manufacturers', title: 'Go To Manufacturers', text: 'Manufacturers', Icon: SvgFactory },
  { link: '/certificates', title: 'Go To Certificates', text: 'Certificates', Icon: SvgCertificate },
  { link: '/downloads', title: 'Go To Downloads', text: 'Downloads', Icon: SvgDocDownload },
  { link: '/contact-us', title: 'Contact Us', text: 'Contact Us', Icon: SvgEnvelopOpen },
  { link: '/signin', title: 'Go To Sign In', text: 'Signin', Icon: SvgLogin },
  { link: '/signup', title: 'Go To Sign Up', text: 'Signup', Icon: SvgUserNew }
]

function NavMainDefault (): JSX.Element {
  return (
    <NavMainCommon
      links={links}
    />
  )
}

export default React.memo(NavMainDefault)
