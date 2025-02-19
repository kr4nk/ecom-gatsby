import * as React from 'react'
import { Link } from 'gatsby'
import { LinkGetProps } from '@reach/router'
import classnames from 'classnames'

import * as userShop from '../../styles/user-shop.module.css'

import { TClassName } from '../../types/common'
import { TCategory } from '../../types/account'

import { SLUG, NAME } from '../../redux/selector-consts'

interface StateProps {
  category: TCategory;
}

function getLinkProps ({ isCurrent }: LinkGetProps): TClassName {
  return {
    className: isCurrent
      ? classnames(userShop.menuLink, userShop.menuLinkActive)
      : userShop.menuLink
  }
}

const NavCategoriesSubcategory = ({ category }: StateProps): JSX.Element => (
  <li className={userShop.menuChildrenItem}>
    <Link
      getProps={getLinkProps}
      to={`/account/category/${category.get(SLUG)}`}
    >
      {
        category.get(NAME)
      }
    </Link>
  </li>
)

export default NavCategoriesSubcategory
