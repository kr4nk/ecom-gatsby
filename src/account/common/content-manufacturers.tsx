import * as React from 'react'
import classnames from 'classnames'

import SearchManufacturers from '../manufacturers/search-manufacturers'
import Pagination from '../manufacturers/pagination'

import HeaderManufacturers from './header-manufacturers'
import ListManufacturers from './list-manufacturers'

import * as layout from '../../styles/layout.module.css'
import * as grid from '../../styles/grid.module.css'
import * as fields from '../../styles/fields.module.css'

import { TImmutableIds } from '../../types/common'
import { TManufacturers } from '../../types/account'

interface OwnProps {
  items: TManufacturers;
  ids: TImmutableIds;
  isFetching: boolean;
  pageSize: number;
  past: number;
}

export default function ContentManufacturers (
  { isFetching, ids, past, pageSize, items }: OwnProps
): JSX.Element {
  const list = React.useMemo(
    function setList (): TImmutableIds {
      return ids.slice(past, past + pageSize)
    }, [ past, pageSize, ids ]
  )

  return (
    <section className={layout.section}>
      <div
        className={
          classnames(
            fields.fieldSet,
            grid.row
          )
        }
      >
        <SearchManufacturers
          className={
            classnames(
              fields.field,
              grid.colMd2
            )
          }
        />
      </div>

      <Pagination
        disabled={isFetching}
        past={past}
        total={ids.size}
        pageSize={pageSize}
      />

      <HeaderManufacturers />

      <ListManufacturers
        isFetching={isFetching}
        list={list}
        items={items}
      />

      <Pagination
        disabled={isFetching}
        past={past}
        total={ids.size}
        pageSize={pageSize}
      />
    </section>
  )
}
