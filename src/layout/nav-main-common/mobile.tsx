import * as React from 'react'
import { connect } from 'react-redux'
import { Link } from 'gatsby'
import { LinkGetProps } from '@reach/router'
import classnames from 'classnames'

import { toggleMobileMenu } from '../../redux/actions/app'

import ModalMobileNav from '../modal-mobile-nav'

import ButtonLogout from './button-logout-connected'

import * as navMain from '../../styles/nav-main.module.css'

import { NavLink } from '../../types/common'

interface OwnProps {
  links: NavLink[];
  enableLogout: boolean;
}

interface DispatchProps {
  onClick: React.MouseEventHandler;
}

interface CurrentLink {
  className: string;
  ref?: React.MutableRefObject<HTMLElement | null>;
}

function Mobile (props: OwnProps & DispatchProps): JSX.Element {
  const focusRef = React.useRef<HTMLElement | null>(null)

  const getLinkProps = React.useCallback(
    function getLinkProps ({ isPartiallyCurrent, isCurrent }: LinkGetProps): CurrentLink {
      return {
        ref: isPartiallyCurrent ? focusRef : undefined,

        className: classnames(
          navMain.menuMobileItem,
          navMain.linkIcon, {
            [navMain.menuMobileItemActive]: isCurrent
          }
        )
      }
    }, []
  )

  return (
    <ModalMobileNav
      focusRef={focusRef}
      onClick={props.onClick}
    >
      <>
        {
          props.links.map(function mapper (item, index): JSX.Element {
            return (
              <Link
                key={index}
                to={item.link}
                title={item.title}
                getProps={getLinkProps}
                onClick={props.onClick}
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
                ref={
                  props.links.length === 0
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    ? focusRef as any
                    : undefined
                }
                className={
                  classnames(
                    navMain.menuMobileItem,
                    navMain.linkIcon
                  )
                }
              />
            )
            : <></>
        }
      </>
    </ModalMobileNav>
  )
}

const mapDispatchToProps: DispatchProps = {
  onClick: toggleMobileMenu
}

export default connect(
  null,
  mapDispatchToProps
)(Mobile)
