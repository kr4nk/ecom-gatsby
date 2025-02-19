import * as React from 'react'
import classnames from 'classnames'

import Spinner from '../../components/common/spinner'

import ProductShop from '../shop/product-shop'
import Pagination from '../shop/pagination'

import * as layout from '../../styles/layout.module.css'
import * as grid from '../../styles/grid.module.css'
import * as products from '../../styles/products.module.css'

import { TImmutableIds } from '../../types/common'
import { TProduct, TProducts } from '../../types/account'

interface OwnProps {
  isFetching: boolean;
  ids: TImmutableIds;
  items: TProducts;
  past: number;
  pageSize: number;
  toBegin: () => void;
}

export default function ProductsShop (props: OwnProps): JSX.Element {
  const { toBegin } = props

  React.useEffect(
    function moveToBegin (): void {
      toBegin()
    }, [ toBegin ]
  )

  return (
    <section className={layout.section}>
      <h2 className={layout.pageTitle}>
        Shop
      </h2>

      <Pagination
        disabled={props.isFetching}
        past={props.past}
        total={props.ids.size}
        pageSize={props.pageSize}
      />

      {
        (
          props.isFetching ||
          props.items.size === 0
        )
          ? <Spinner />
          : (
            <ul
              className={
                classnames(
                  products.productsList,
                  grid.row
                )
              }
            >
              {
                props.ids
                  .slice(
                    props.past,
                    props.past + props.pageSize
                  )
                  .map(function mapper (id): JSX.Element {
                    return (
                      <ProductShop
                        key={id}
                        product={props.items.get(id) as TProduct}
                      />
                    )
                  })
              }
            </ul>
          )
      }

      <Pagination
        disabled={props.isFetching}
        past={props.past}
        total={props.ids.size}
        pageSize={props.pageSize}
      />
    </section>
  )
}
