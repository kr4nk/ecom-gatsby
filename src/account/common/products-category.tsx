import * as React from 'react'
import classnames from 'classnames'

import ProductShop from '../shop/product-shop'

import Pagination from '../category/pagination'

import * as layout from '../../styles/layout.module.css'
import * as grid from '../../styles/grid.module.css'
import * as products from '../../styles/products.module.css'

import { TImmutableIds } from '../../types/common'
import { TProduct, TProducts } from '../../types/account'

interface OwnProps {
  pageSize: number;
  ids: TImmutableIds;
  hasProducts: boolean;
}

interface StateProps {
  categoryId: string;
  past: number;
  items: TProducts;
}

export default function ProductsCategory ({
  past,
  pageSize,
  hasProducts,
  categoryId,
  ids,
  items
}: OwnProps & StateProps): JSX.Element {
  const list = React.useMemo<TImmutableIds>(
    function setList (): TImmutableIds {
      return ids.slice(
        past,
        past + pageSize
      )
    }, [ past, pageSize, ids ]
  )

  return (
    <section className={layout.section}>
      <h2 className={layout.sectionTitle}>
        Products
      </h2>

      {
        hasProducts
          ? (
            <>
              <Pagination
                disabled={false}
                past={past}
                total={ids.size}
                pageSize={pageSize}
                categoryId={categoryId}
              />

              <ul
                className={
                  classnames(
                    products.productsList,
                    grid.row
                  )
                }
              >
                {
                  list.map(function mapper (id): JSX.Element {
                    return (
                      <ProductShop
                        key={id}
                        product={items.get(id) as TProduct}
                      />
                    )
                  })
                }
              </ul>

              <Pagination
                disabled={false}
                past={past}
                total={ids.size}
                pageSize={pageSize}
                categoryId={categoryId}
              />
            </>
          )
          : (
            <div className={layout.noContent}>
              There are no products in this category yet.
            </div>
          )
      }
    </section>
  )
}
