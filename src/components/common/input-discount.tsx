import classnames from 'classnames'
import * as React from 'react'

import { clamp } from '../../utils/number'

import * as inputQuantity from '../../styles/input-quantity.module.css'
import * as utility from '../../styles/utility.module.css'

interface OwnProps {
  id: string;
  value: number;
  min: number;
  max: number;
  disabled: boolean;
  onChange (value: number): void;
}

export default function InputDiscount (props: OwnProps): JSX.Element {
  const filterValue = React.useCallback(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    function filterValue (value: number): any {
      return clamp(
        value,
        props.min,
        props.max
      )
    }, [ props.min, props.max ]
  )

  const onChange = React.useCallback<React.ChangeEventHandler<HTMLInputElement>>(
    function onChange ({ target: { value } }): void {
      props.onChange(
        filterValue(parseInt(value, 10))
      )
    }, [ props, filterValue ]
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
    }, [ props, filterValue ]
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
      Discount (%)

      <div
        className={
          classnames(
            inputQuantity.inputGroup,
            inputQuantity.inputGroupSmall,
            utility.df,
            utility.aic
          )
        }
      >
        <button
          className={
            classnames(
              inputQuantity.quantityMinus,
              inputQuantity.inputSmall,
              utility.roboto,
              utility.bold
            )
          }
          disabled={
            props.disabled ||
            props.value === props.min
          }
          onClick={onMinusClick}
          type='button'
        >
          -
        </button>

        <input
          id={`discount-${props.id}`}
          name={`discount-${props.id}`}
          className={
            classnames(
              inputQuantity.quantityInput,
              inputQuantity.inputSmall,
              utility.tac
            )
          }
          type='text'
          inputMode='numeric'
          value={props.value}
          disabled={props.disabled}
          onChange={onChange}
        />

        <button
          className={
            classnames(
              inputQuantity.quantityPlus,
              inputQuantity.inputSmall,
              utility.roboto,
              utility.bold
            )
          }
          onClick={onPlusClick}
          disabled={
            props.disabled ||
            props.value === props.max
          }
          type='button'
        >
          +
        </button>
      </div>
    </label>
  )
}
