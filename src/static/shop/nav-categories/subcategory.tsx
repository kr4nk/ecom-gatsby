import * as React from 'react'
import { Link } from 'gatsby'
import { LinkGetProps } from '@reach/router'
import classnames from 'classnames'

import * as userShop from '../../../styles/user-shop.module.css'

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

function Subcategory ({ category }: OwnProps): JSX.Element {
  return (
    <li className={userShop.menuChildrenItem}>
      <Link
        title={`Go To Category ${category.name}`}
        getProps={getLinkProps}
        to={`/category/${category.slug}`}
      >
        {category.name}
      </Link>
    </li>
  )
}

export default React.memo(Subcategory)
