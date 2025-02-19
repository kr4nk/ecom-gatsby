import * as React from 'react'
import { Link } from 'gatsby'
import classnames from 'classnames'

import * as tableResponsive from '../../styles/table-responsive.module.css'
import * as utility from '../../styles/utility.module.css'

import { TCategory } from '../../types/account'

import {
  NAME,
  SLUG,
  CHILDREN,
  PRODUCTS
} from '../../redux/selector-consts';

interface OwnProps {
  category: TCategory;
}

const ItemCategories = ({ category }: OwnProps): JSX.Element => (
  <li className={utility.lsn}>
    <Link
      title={`Category ${category.get(NAME)}`}
      className={tableResponsive.tableLink}
      to={`/account/category/${category.get(SLUG)}`}
    >
      <div className={tableResponsive.tableRow}>
        <div
          className={tableResponsive.tableCell}
          data-title='Category'
        >
          { category.get(NAME) }
        </div>

        <div
          className={
            classnames(
              tableResponsive.tableCell,
              tableResponsive.tableCellXSmall,
              utility.tar
            )
          }
          data-title='Sub-categories'
        >
          {
            category.get(CHILDREN).size
          }
        </div>

        <div
          className={
            classnames(
              tableResponsive.tableCell,
              tableResponsive.tableCellXSmall,
              utility.tar
            )
          }
          data-title='Products'
        >
          {
            category.get(PRODUCTS).size
          }
        </div>
      </div>
    </Link>
  </li>
)

export default ItemCategories
