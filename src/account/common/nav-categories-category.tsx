import * as React from 'react'
import { Link } from 'gatsby'
import classnames from 'classnames'

import NavCategoriesSubcategory from './nav-categories-subcategory'

import SvgMinus from '../../components/svg/minus'
import SvgPlus from '../../components/svg/plus'

import * as userShop from '../../styles/user-shop.module.css'
import * as utility from '../../styles/utility.module.css'
import { TCategory, TCategories } from '../../types/account'

import {
  NAME,
  SLUG,
  CHILDREN
} from '../../redux/selector-consts'

interface StateProps {
  items: TCategories;
  category: TCategory;
}

const partiallyActive = ({ isPartiallyCurrent }: { isPartiallyCurrent: boolean }): { className: string } => {
  return ({
    className: isPartiallyCurrent
      ? classnames(userShop.menuLink, userShop.menuLinkActive)
      : userShop.menuLink
  })
}

const NavCategoriesCategory = (props: StateProps): JSX.Element => {
  const [ expanded, setExpanded ] = React.useState(false)

  const toggleExpanded = React.useCallback(
    function useCallback (): void {
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
          getProps={partiallyActive}
          to={`/account/category/${props.category.get(SLUG)}`}
        >
          { props.category.get(NAME) }
        </Link>

        {
          props.category.get(CHILDREN).size > 0 && (
            <button
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
          props.category
            .get(CHILDREN)
            .map(function mapper (id: string): JSX.Element {
              return (
                <NavCategoriesSubcategory
                  key={id}
                  category={props.items.get(id) as TCategory}
                />
              )
            })
        }
      </ul>
    </li>
  )
}

export default NavCategoriesCategory
