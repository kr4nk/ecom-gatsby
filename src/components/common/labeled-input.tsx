import * as React from 'react'
import classnames from 'classnames'

import InvalidMessage from './invalid-message'

import * as fields from '../../styles/fields.module.css'

import { OnOff } from '../../types/common'

interface OwnProps {
  autoCapitalize?: OnOff;
  autoComplete?: OnOff;
  autoCorrect?: OnOff;
  noValidate?: boolean;
  pattern?: string;
  inputMode?: string;
  invalid: boolean;
  valid: boolean;
  required?: boolean;
  disabled?: boolean;
  value: string;
  className: string;
  iconClassName?: string;
  inputClassName: string;
  labelClassName: string;
  validClassName: string;
  invalidClassName: string;
  labelText: string;
  icon?: React.ReactNode;
  id: string;
  name?: string;
  placeholder: string;
  invalidMessage?: string;
  type: string;

  onBlur?: React.FocusEventHandler;
  onFocus?: React.FocusEventHandler;
  onChange?: React.ChangeEventHandler;
  onKeyDown?: React.KeyboardEventHandler;
  onKeyPress?: React.KeyboardEventHandler;
  onKeyUp?: React.KeyboardEventHandler;
}

export default function LabeledInput ({
  id,
  name,
  type,
  placeholder,
  labelText,
  invalidMessage,
  autoComplete,
  autoCorrect,
  autoCapitalize,
  inputMode,
  noValidate,
  pattern,
  className,
  inputClassName,
  labelClassName,
  validClassName,
  invalidClassName,
  icon,
  iconClassName,
  value,
  valid,
  invalid,
  required,
  disabled,
  onBlur,
  onFocus,
  onChange,
  onKeyDown,
  onKeyPress,
  onKeyUp,
  ...rest
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
          type={type}
          className={
            classnames(inputClassName, {
              [fields.inputIcon]: icon,
              [validClassName]: valid,
              [invalidClassName]: invalid
            })
          }
          value={value}
          pattern={pattern}
          placeholder={placeholder}

          inputMode={inputMode}
          formNoValidate={noValidate}
          required={required}
          disabled={disabled}

          autoCorrect={autoCorrect}
          autoComplete={autoComplete}
          autoCapitalize={autoCapitalize}

          onKeyUp={onKeyUp}
          onKeyPress={onKeyPress}
          onKeyDown={onKeyDown}
          onChange={onChange}
          onFocus={onFocus}
          onBlur={onBlur}

          aria-invalid={invalid}
          aria-labelledby={`${id}-label`}
          aria-describedby={`${id}-desc`}

          {...rest}
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

LabeledInput.defaultProps = {
  onKeyDown (): void {},
  onChange (): void {}
}
