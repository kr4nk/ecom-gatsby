import * as React from 'react'
import classnames from 'classnames'

import InvalidMessage from './invalid-message'

import { OnOff } from '../../types/common'

interface OwnProps {
  id: string;
  name?: string;
  labelText: string;
  placeholder: string;
  className: string;
  inputClassName: string;
  labelClassName: string;
  validClassName: string;
  invalidClassName: string;
  invalidMessage?: string;
  autoCapitalize?: OnOff;
  autoComplete: OnOff;
  autoCorrect?: OnOff;
  value: string;
  valid: boolean;
  invalid: boolean;
  disabled: boolean;
  required: boolean;
  onChange: React.ChangeEventHandler;
  onFocus?: React.FocusEventHandler;
  onBlur?: React.FocusEventHandler;
}

export default function LabeledTextarea ({
  id,
  name,
  className,
  labelText,
  placeholder,
  invalidMessage,
  autoCapitalize,
  autoComplete,
  autoCorrect,
  labelClassName,
  inputClassName,
  validClassName,
  invalidClassName,
  value,
  valid,
  invalid,
  disabled,
  required,
  onBlur,
  onFocus,
  onChange
}: OwnProps): JSX.Element {
  return (
    <div className={className}>
      <label
        id={`${id}-label`}
        htmlFor={id}
        className={labelClassName}
      >
        { labelText }

        <textarea
          id={id}
          name={name}
          aria-invalid={invalid}
          aria-labelledby={`${id}-label`}
          aria-describedby={`${id}-desc`}
          className={
            classnames(inputClassName, {
              [validClassName]: valid,
              [invalidClassName]: invalid
            })
          }
          value={value}
          placeholder={placeholder}
          autoCapitalize={autoCapitalize}
          autoComplete={autoComplete}
          autoCorrect={autoCorrect}
          disabled={disabled}
          required={required}
          onChange={onChange}
          onFocus={onFocus}
          onBlur={onBlur}
        />
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
