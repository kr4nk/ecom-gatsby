import * as React from 'react'
import { connect } from 'react-redux'

import { getIsFetching } from '../../redux/selectors/user-shop'

import {
  getCategoriesIds,
  getCategoriesPast,
  getCategoriesPageSize
} from '../../redux/selectors/user-categories'

import HeaderCategories from '../common/header-categories'
import ListCategories from './list-categories'

import Pagination from './pagination'

import * as layout from '../../styles/layout.module.css'

import { ReduxState, TImmutableIds } from '../../types/common'

interface StateProps {
  isFetching: boolean;
  ids: TImmutableIds;
  pageSize: number;
  past: number;
}

const Categories = (props: StateProps): JSX.Element => {
  const list = React.useMemo<TImmutableIds>(
    function sliceList (): TImmutableIds {
      return props.ids.slice(
        props.past,
        props.past + props.pageSize
      )
    }, [ props.past, props.ids, props.pageSize ]
  )

  return (
    <div className={layout.container}>
      <div className={layout.content}>
        <h1 className={layout.pageTitle}>
          Categories
        </h1>

        <section className={layout.section}>
          <Pagination
            disabled={props.isFetching}
            past={props.past}
            total={props.ids.size}
            pageSize={props.pageSize}
          />

          <HeaderCategories />

          <ListCategories
            isFetching={props.isFetching}
            ids={list}
          />

          <Pagination
            disabled={props.isFetching}
            past={props.past}
            total={props.ids.size}
            pageSize={props.pageSize}
          />
        </section>
      </div>
    </div>
  )
}

const mapStateToProps = (state: ReduxState): StateProps => ({
  isFetching: getIsFetching(state),
  ids: getCategoriesIds(state),
  past: getCategoriesPast(state),
  pageSize: getCategoriesPageSize(state)
})

export default connect(
  mapStateToProps
)(Categories)
