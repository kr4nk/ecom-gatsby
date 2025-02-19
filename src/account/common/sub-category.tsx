import * as React from 'react'
import { Link } from 'gatsby'
import classnames from 'classnames'

import * as tableResponsive from '../../styles/table-responsive.module.css'
import * as utility from '../../styles/utility.module.css'

import { TCategory } from '../../types/account'

import {
  NAME,
  PRODUCTS,
  SLUG
} from '../../redux/selector-consts'

interface OwnProps {
  subcategory: TCategory;
}

const SubCategory = ({ subcategory }: OwnProps): JSX.Element => (
  <li className={utility.lsn}>
    <Link
      title={`Subategory ${subcategory.get(NAME)} ${subcategory.get(PRODUCTS).size}`}
      className={tableResponsive.tableLink}
      to={`/account/category/${subcategory.get(SLUG)}`}
    >
      <div className={tableResponsive.tableRowResponsive}>
        <div
          className={tableResponsive.tableCell}
          data-title='Sub-category'
        >
          { subcategory.get(NAME) }
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
          { subcategory.get(PRODUCTS).size }
        </div>
      </div>
    </Link>
  </li>
)

export default SubCategory
