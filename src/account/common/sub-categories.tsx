import * as React from 'react'

import * as layout from '../../styles/layout.module.css'

import HeaderSubCategories from './header-sub-categories'
import ListSubCategories from '../category/list-sub-categories'

import { TCategory } from '../../types/account'

import { CHILDREN } from '../../redux/selector-consts'

interface StateProps {
  category: TCategory;
}

const SubCategories = ({ category }: StateProps): JSX.Element => (
  <section className={layout.section}>
    <h2 className={layout.sectionTitle}>
      Sub-categories
    </h2>

    <HeaderSubCategories />

    <ListSubCategories
      ids={category.get(CHILDREN)}
    />
  </section>
)

export default SubCategories
