import * as React from 'react'
import { List } from 'immutable'
import classnames from 'classnames'

import { scrollToEnd, scrollToBack, scrollToNext } from '../../utils/number'

import * as grid from '../../styles/grid.module.css'
import * as layout from '../../styles/layout.module.css'
import * as products from '../../styles/products.module.css'

import Spinner from '../../components/common/spinner'
import Pagination from '../../components/common/pagination'

import ProductSearch from '../search/product-search'

import { TImmutableIds } from '../../types/common'

import {
  TProduct,
  TProducts,
  TProductSearchFieldsMap,
  TManufacturers,
  TManufacturerSearchFieldsMap
} from '../../types/account'

import { NAME, DESC_SHORT, DESC_FULL, DETAILS, MANUFACTURER_ID } from '../../redux/selector-consts'

interface OwnProps {
  isFetching: boolean;
  search: string;
  list: TImmutableIds;
  items: TProducts;
  manufacturers: TManufacturers;
}

const productFields = [NAME, DESC_SHORT, DESC_FULL, DETAILS]
const manufacturerFields = [NAME, DESC_SHORT]

export default function ProductsSearch (props: OwnProps): JSX.Element {
  const pageSize = 20
  const [ past, setPast ] = React.useState(0)

  const filtered = React.useMemo(
    function setFiltered (): TImmutableIds {
      const value = props.search.toLowerCase()

      let filtered: TImmutableIds = List()

      if (value.length > 1) {
        // eslint-disable-next-line perf-standard/check-function-inline
        filtered = props.list.filter(function filter (id): boolean {
          const item = props.items.get(id) as TProductSearchFieldsMap

          for (const field of productFields) {
            if (item.get(field).toLowerCase().includes(value)) {
              return true
            }
          }

          const obj = props.manufacturers.get(
            item.get(MANUFACTURER_ID)
          ) as TManufacturerSearchFieldsMap

          if (obj !== undefined) {
            for (const field of manufacturerFields) {
              if (obj.get(field).toLowerCase().includes(value)) {
                return true
              }
            }
          }

          return false
        })
      }

      setPast(0)

      return filtered
    },
    [ props.search, props.list, props.items, props.manufacturers ]
  )

  const toBegin = React.useCallback<React.MouseEventHandler>(
    function useCallback (): void {
      setPast(0)
    }, []
  )

  const toEnd = React.useCallback<React.MouseEventHandler>(
    function useCallback (): void {
      setPast(
        scrollToEnd(filtered.size, pageSize)
      )
    }, [ filtered.size ]
  )

  const goBack = React.useCallback<React.MouseEventHandler>(
    function useCallback (): void {
      setPast(function setPast (past): number {
        return scrollToBack(past, pageSize)
      })
    }, []
  )

  const goNext = React.useCallback<React.MouseEventHandler>(
    function useCallback (): void {
      setPast(function setPast (past): number {
        return scrollToNext(past, filtered.size, pageSize)
      })
    }, [ filtered.size ]
  )

  if (filtered.size === 0) {
    return (<></>)
  }

  if (props.isFetching) {
    return (<Spinner />)
  }

  return (
    <section className={layout.section}>
      <h2 className={layout.pageTitle}>
        Products
      </h2>

      <Pagination
        disabled={false}

        past={past}
        total={filtered.size}
        pageSize={pageSize}

        toBegin={toBegin}
        toEnd={toEnd}
        goBack={goBack}
        goNext={goNext}
      />

      <ul
        className={
          classnames(products.productsList, grid.row)
        }
      >
        {
          filtered
            .slice(
              past,
              past + pageSize
            )
            .map(function mapper (id): JSX.Element {
              return (
                <ProductSearch
                  key={id}
                  search={props.search}
                  product={props.items.get(id) as TProduct}
                />
              )
            })
        }
      </ul>

      <Pagination
        disabled={false}

        past={past}
        total={filtered.size}
        pageSize={pageSize}

        toBegin={toBegin}
        toEnd={toEnd}
        goBack={goBack}
        goNext={goNext}
      />
    </section>
  )
}
