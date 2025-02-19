import * as React from 'react'
import classnames from 'classnames'

import Price from '../../components/common/price'
import ButtonAddToCart from '../../components/common/button-add-to-cart'
import InputQuantityRemove from '../../components/common/input-quantity-remove'

import * as productsList from '../../styles/products-list.module.css'
import * as utility from '../../styles/utility.module.css'

import { TProductVersion } from '../../types/account'

import { ID, SIZE, UNIT, PRICE } from '../../redux/selector-consts'

interface StateProps {
  value: number;
  discount: number;
  productId: string;
  version: TProductVersion;
  setVersionValue(productId: string, versionId: string, value: number): void;
  removeCartItem(productId: string, versionId: string): void;
}

const VersionCart = (props: StateProps): JSX.Element => {
  const {
    productId,
    version,
    setVersionValue,
    removeCartItem
  } = props

  const onChange = React.useCallback(
    function useCallback (value): void {
      setVersionValue(
        productId,
        version.get(ID),
        value
      )
    }, [ productId, version, setVersionValue ]
  )

  const onAddToCartClick = React.useCallback(
    function useCallback (): void {
      setVersionValue(
        productId,
        version.get(ID),
        1
      )
    }, [ productId, version, setVersionValue ]
  )

  const onRemoveItemClick = React.useCallback(
    function useCallback (): void {
      removeCartItem(
        productId,
        version.get(ID)
      )
    }, [ productId, version, removeCartItem ]
  )

  return (
    <div
      className={
        classnames(
          productsList.itemVersionCart,
          utility.df,
          utility.aic
        )
      }
    >
      <div className={productsList.itemWeight}>
        <div className={productsList.itemWeightBadge}>
          {props.version.get(SIZE)}

          &nbsp;

          {props.version.get(UNIT)}
        </div>
      </div>

      <div
        className={
          classnames(
            productsList.itemQuantityGroup,
            utility.df,
            utility.aic
          )
        }
      >
        <div className={productsList.itemQuantity}>
          {
            props.value !== undefined
              ? (
                <InputQuantityRemove
                  id={props.version.get(ID)}
                  value={props.value}
                  min={0}
                  max={9999}
                  onRemove={onRemoveItemClick}
                  onChange={onChange}
                />
              )
              : (
                <div className={productsList.buttonAddToCart}>
                  <ButtonAddToCart
                    onClick={onAddToCartClick}
                  />
                </div>
              )
          }
        </div>

        <div className={productsList.times}>
          <span className={utility.roboto}>
            &times;
          </span>
        </div>

        <div className={productsList.itemPrice}>
          <Price
            position='list'
            discount={props.discount}
            price={props.version.get(PRICE)}
          />
        </div>
      </div>

      <div
        className={
          classnames(
            productsList.itemTotal,
            utility.tar
          )
        }
      >
        {
          props.value > 0 && (
            <span className={productsList.itemTotalPrice}>
              {
                new Intl.NumberFormat(
                  'en-US', {
                    style: 'currency',
                    currency: 'USD'
                  }
                ).format(
                  props.value * (
                    props.version.get(PRICE) -
                    props.version.get(PRICE) / 100 * props.discount
                  )
                )
              }
            </span>
          )
        }
      </div>
    </div>
  )
}

export default VersionCart
