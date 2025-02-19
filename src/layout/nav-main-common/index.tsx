import * as React from 'react'

import useWide from '../nav-main-common/use-wide'
import ButtonMobile from '../nav-main-common/button-mobile'

import Mobile from '../nav-main-common/mobile'
import Desktop from '../nav-main-common/desktop'

import * as navMain from '../../styles/nav-main.module.css'
import * as layoutPage from '../../styles/layout-page.module.css'

import { NavLink } from '../../types/common'

interface OwnProps {
  links: NavLink[];
  enableLogout: boolean;
}

function NavMainCommon (props: OwnProps): JSX.Element {
  const wide = useWide()

  return (
    <nav className={layoutPage.nav}>
      <div className={navMain.menu}>
        {
          wide
            ? (
              <Desktop {...props} />
            )
            : (
              <ButtonMobile>
                <Mobile {...props} />
              </ButtonMobile>
            )
        }
      </div>
    </nav>
  )
}

NavMainCommon.defaultProps = {
  enableLogout: false
}

export default React.memo(NavMainCommon)
