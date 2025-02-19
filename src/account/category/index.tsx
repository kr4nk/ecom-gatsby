import * as React from 'react'
import { connect } from 'react-redux'

import { getCategoryBySlug } from '../../redux/selectors/user-categories'

import Breadcrumbs from './breadcrumbs'
import SubCategories from '../common/sub-categories'
import Products from './products-category'

// import ButtonReturn from '../../components/common/button-return'

import * as layout from '../../styles/layout.module.css'

import { ReduxState } from '../../types/common'
import { TCategory } from '../../types/account'

import {
  NAME, CHILDREN, ID, PRODUCTS
} from '../../redux/selector-consts'

interface StateProps {
  category: TCategory | undefined;
}

interface OwnProps {
  slug: string;
}

function Category ({ category }: StateProps): JSX.Element {
  return category !== undefined
    ? (
      <div className={layout.container}>
        <div className={layout.content}>
          <Breadcrumbs
            category={category}
          />

          <h1 className={layout.pageTitle}>
            Category: { category.get(NAME) }
          </h1>

          {
            (
              category.get(CHILDREN) &&
              category.get(CHILDREN).size > 0
            ) && (
              <SubCategories
                category={category}
              />
            )
          }

          <Products
            categoryId={category.get(ID)}
            ids={category.get(PRODUCTS)}
            hasProducts={category.get(PRODUCTS).size > 0}
          />

          <Breadcrumbs
            category={category}
          />
        </div>
      </div>
    )
    : (<></>)
}

const mapStateToProps = (state: ReduxState, { slug }: OwnProps): StateProps => ({
  category: getCategoryBySlug(state, slug)
})

export default connect(
  mapStateToProps
)(Category)
