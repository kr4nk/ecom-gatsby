import * as React from 'react'

import SubCategory from './sub-category'

import * as tableResponsive from '../../styles/table-responsive.module.css'

import { TImmutableIds } from '../../types/common'
import { TCategories, TCategory } from '../../types/account'

interface OwnProps {
  ids: TImmutableIds;
  items: TCategories;
}

const ListSubCategories = ({ ids, items }: OwnProps): JSX.Element => (
  <ul className={tableResponsive.tableBody}>
    {
      ids.map(function mapper (id): JSX.Element {
        return (
          <SubCategory
            key={id}
            subcategory={items.get(id) as TCategory}
          />
        )
      })
    }
  </ul>
)

export default ListSubCategories
