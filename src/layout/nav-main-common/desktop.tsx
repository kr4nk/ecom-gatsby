import * as React from 'react'
import { Link } from 'gatsby'
import { LinkGetProps } from '@reach/router'
import classnames from 'classnames'

import ButtonLogout from './button-logout-connected'

import * as navMain from '../../styles/nav-main.module.css'
import * as utility from '../../styles/utility.module.css'

import { TClassName, NavLink } from '../../types/common'

interface OwnProps {
  links: NavLink[];
  enableLogout: boolean;
}

function getLinkProps ({ isCurrent }: LinkGetProps): TClassName {
  return {
    className: classnames(
      navMain.menuDesktopItem,
      navMain.linkIcon, {
        [navMain.menuDesktopItemActive]: isCurrent
      }
    )
  }
}

function Desktop (props: OwnProps): JSX.Element {
  return (
    <nav
      className={
        classnames(
          navMain.menuDesktop,
          utility.roboto
        )
      }
    >
      {
        props.links.map(function mapper (item, index): JSX.Element {
          return (
            <Link
              key={index}
              to={item.link}
              title={item.title}
              getProps={getLinkProps}
            >
              <div
                role='img'
                aria-hidden
                className={navMain.icon}
              >
                <item.Icon />
              </div>

              { item.text }
            </Link>
          )
        })
      }

      {
        props.enableLogout
          ? (
            <ButtonLogout
              className={
                classnames(
                  navMain.menuDesktopItem,
                  navMain.linkIcon
                )
              }
            />
          )
          : <></>
      }
    </nav>
  )
}

export default React.memo(Desktop)
