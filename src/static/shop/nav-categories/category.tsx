import * as React from 'react'
import { Link } from 'gatsby'
import { LinkGetProps } from '@reach/router'
import classnames from 'classnames'

import SubCategory from './subcategory'

import SvgMinus from '../../../components/svg/minus'
import SvgPlus from '../../../components/svg/plus'

import { ContextIndex } from '../../../context/index'

import * as userShop from '../../../styles/user-shop.module.css'
import * as utility from '../../../styles/utility.module.css'

import { TCategory } from '../../../types/static'

interface OwnProps {
  category: TCategory;
}

function getLinkProps ({ isCurrent }: LinkGetProps): {} {
  return {
    className: isCurrent
      ? classnames(
        userShop.menuLink,
        userShop.menuLinkActive
      )
      : userShop.menuLink
  }
}

function Category (props: OwnProps): JSX.Element {
  const { categoryItems } = React.useContext(ContextIndex)

  const [ expanded, setExpanded ] = React.useState(false)

  const toggleExpanded = React.useCallback<React.MouseEventHandler>(
    function toggleExpanded (): void {
      setExpanded(!expanded)
    }, [ expanded ]
  )

  return (
    <li className={userShop.menuItem}>
      <header
        className={
          classnames(
            utility.df,
            utility.jcsb
          )
        }
      >
        <Link
          title={`Go To Category ${props.category.name}`}
          getProps={getLinkProps}
          to={`/category/${props.category.slug}`}
        >
          {props.category.name}
        </Link>

        {
          props.category.children.length > 0 && (
            <button
              aria-label={
                expanded
                  ? 'Collapse'
                  : 'Expand'
              }
              className={userShop.menuItemButton}
              onClick={toggleExpanded}
              type='button'
            >
              {
                expanded
                  ? (<SvgMinus />)
                  : (<SvgPlus />)
              }
            </button>
          )
        }
      </header>

      <ul className={userShop.menuChildren}>
        {
          expanded &&
          props.category.children.map(function mapper (id): JSX.Element {
            return (
              <SubCategory
                key={id}
                category={categoryItems[id]}
              />
            )
          })
        }
      </ul>
    </li>
  )
}

export default React.memo(Category)
