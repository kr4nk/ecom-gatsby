import * as React from 'react'
import classnames from 'classnames'

import InvalidMessage from './invalid-message'

import { OnOff } from '../../types/common'

interface OwnProps {
  autoComplete: OnOff;
  noValidate?: boolean;
  pattern?: string;
  step: number;
  min: number;
  max?: number;
  required?: boolean;
  disabled?: boolean;
  value: number;
  valid: boolean;
  invalid: boolean;
  className: string;
  iconClassName?: string;
  inputClassName: string;
  labelClassName: string;
  validClassName: string;
  invalidClassName: string;
  id: string;
  name?: string;
  inputMode?: string;
  labelText: string;
  placeholder: string;
  invalidMessage?: string;
  icon?: React.ReactNode;
  onChange: React.ChangeEventHandler;
  onFocus: React.FocusEventHandler;
  onBlur: React.FocusEventHandler;
}

export default function LabeledNumber ({
  id,
  name,
  inputMode,
  className,
  inputClassName,
  labelClassName,
  autoComplete,
  valid,
  invalid,
  required,
  disabled,
  validClassName,
  invalidClassName,
  icon,
  iconClassName,
  labelText,
  invalidMessage,
  noValidate,
  pattern,
  onBlur,
  onFocus,
  onChange,
  placeholder,
  value,
  step,
  min,
  max
}: OwnProps): JSX.Element {
  return (
    <div className={className}>
      <label
        id={`${id}-label`}
        htmlFor={id}
        className={labelClassName}
      >
        { labelText }

        <input
          id={id}
          name={name}
          type='number'
          inputMode={inputMode}
          className={
            classnames(inputClassName, {
              [validClassName]: valid,
              [invalidClassName]: invalid
            })
          }
          value={value}
          pattern={pattern}
          placeholder={placeholder}
          step={step}
          min={min}
          max={max}
          autoComplete={autoComplete}
          formNoValidate={noValidate}
          onChange={onChange}
          onFocus={onFocus}
          onBlur={onBlur}
          required={required}
          disabled={disabled}

          aria-invalid={invalid}
          aria-labelledby={`${id}-label`}
          aria-describedby={`${id}-desc`}
        />

        {
          icon !== undefined && (
            <div
              role='img'
              aria-hidden
              className={iconClassName}
            >
              { icon }
            </div>
          )
        }
      </label>

      {
        invalid && (
          <InvalidMessage
            value={invalidMessage}
            id={`${id}-desc`}
          />
        )
      }
    </div>
  )
}

LabeledNumber.defaultProps = {
  inputMode: 'number'
}
