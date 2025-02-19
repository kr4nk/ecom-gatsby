import classnames from 'classnames'
import * as React from 'react'

import { clamp } from '../../utils/number'

import * as buttons from '../../styles/buttons.module.css'
import * as inputQuantity from '../../styles/input-quantity.module.css'
import * as utility from '../../styles/utility.module.css'

interface OwnProps {
  id: string;
  value: number;
  min: number;
  max: number;
  onRemove (): void;
  onChange (value: number): void;
}

export default function InputQuantityRemove (props: OwnProps): JSX.Element {
  const filterValue = React.useCallback(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    function filterValue (value: number): any { // TODO
      return clamp(
        value,
        props.min,
        props.max
      )
    }, [ props.min, props.max ]
  )

  const onMinusClick = React.useCallback<React.MouseEventHandler>(
    function onMinusClick (): void {
      props.onChange(
        filterValue(props.value - 1)
      )
    }, [ props, filterValue ]
  )

  const onPlusClick = React.useCallback<React.MouseEventHandler>(
    function onPlusClick (): void {
      props.onChange(
        filterValue(props.value + 1)
      )
    }, [ filterValue, props ]
  )

  const onChange = React.useCallback<React.ChangeEventHandler<HTMLInputElement>>(
    function onChange ({ target: { value } }): void {
      props.onChange(
        filterValue(parseInt(value, 10))
      )
    }, [ filterValue, props ]
  )

  return (
    <label
      htmlFor={`quantity-${props.id}`}
      className={
        classnames(
          inputQuantity.inputQuantity,
          utility.db,
          utility.tac
        )
      }
    >
      Quantity

      <div
        className={
          classnames(
            inputQuantity.inputGroup,
            utility.df,
            utility.aic
          )
        }
      >
        <button
          aria-label='Minus'
          className={
            classnames(
              inputQuantity.quantityMinus,
              utility.roboto,
              utility.bold
            )
          }
          disabled={props.value === props.min}
          onClick={onMinusClick}
          type='button'
        >
          <span aria-hidden>
            -
          </span>
        </button>

        <input
          id={`quantity-${props.id}`}
          className={
            classnames(
              inputQuantity.quantityInput,
              utility.tac
            )
          }
          type='text'
          inputMode='numeric'
          name='quantity-input'
          value={props.value}
          onChange={onChange}
        />

        <button
          aria-label='Plus'
          className={
            classnames(
              inputQuantity.quantityPlus,
              utility.roboto,
              utility.bold
            )
          }
          disabled={props.value === props.max}
          onClick={onPlusClick}
          type='button'
        >
          <span aria-hidden>
            +
          </span>
        </button>
      </div>

      <div>
        <button
          className={
            classnames(
              buttons.button,
              buttons.buttonDangerText,
              buttons.buttonTextSmall
            )
          }
          onClick={props.onRemove}
          type='button'
        >
          Remove
        </button>
      </div>
    </label>
  )
}
