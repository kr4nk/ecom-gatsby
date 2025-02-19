import * as React from 'react'
import { Link } from 'gatsby'

import * as breadcrumbs from '../../styles/breadcrumbs.module.css'

import {
  TCategory,
  TCategories
} from '../../types/account'

import {
  PARENT_ID,
  SLUG,
  NAME
} from '../../redux/selector-consts'

interface StateProps {
  categories: TCategories;
  category: TCategory;
}

const BreadcrumbsCategories = ({ category, categories }: StateProps): JSX.Element => (
  <ul className={breadcrumbs.breadcrumbs}>
    <li className={breadcrumbs.breadcrumb}>
      <Link
        title='Categories'
        to='/account/categories'
      >
        Categories
      </Link>
    </li>

    {
      category.get(PARENT_ID) !== 'none' && (
        <li className={breadcrumbs.breadcrumb}>
          <Link
            title='Category'
            to={
              `/account/category/${categories.getIn([category.get(PARENT_ID), SLUG])}`
            }
          >
            {
              categories.getIn([category.get(PARENT_ID), NAME])
            }
          </Link>
        </li>
      )
    }

    <li className={breadcrumbs.breadcrumb}>
      { category.get(NAME) }
    </li>
  </ul>
)

export default BreadcrumbsCategories
