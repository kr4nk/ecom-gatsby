import * as React from 'react'
import classnames from 'classnames'

import * as fields from '../../styles/fields.module.css'
import * as utility from '../../styles/utility.module.css'

interface OwnProps {
  id: string;
  name?: string;
  checked?: boolean;
  labelText?: string;
  checkboxText: string;
  descriptionText?: string;
  className: string;
  labelClassName?: string;
  checkboxClassName?: string;
  validClassName: string;
  invalidClassName: string;
  noValidate?: boolean;
  invalid: boolean;
  valid: boolean;
  required?: boolean;
  disabled?: boolean;
  onChange (event: React.ChangeEvent<HTMLInputElement>): void;
}

export default function LabeledCheckbox ({
  id,
  name,
  checked,
  labelText,
  checkboxText,
  descriptionText,
  className,
  labelClassName,
  checkboxClassName,
  validClassName,
  invalidClassName,
  noValidate,
  valid,
  invalid,
  required,
  disabled,
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

        <div
          className={
            classnames(
              fields.checkbox,
              checkboxClassName,
              utility.df,
              utility.aic, {
                [validClassName]: valid,
                [invalidClassName]: invalid
              }
            )
          }
        >
          <input
            id={id}
            name={name}
            type='checkbox'
            formNoValidate={noValidate}
            className={fields.checkboxInput}
            aria-checked={checked}
            aria-labelledby={`${id}-label`}
            aria-describedby={`${id}-desc`}
            checked={checked}
            required={required}
            disabled={disabled}
            onChange={onChange}
          />

          { checkboxText }
        </div>

        {
          descriptionText && (
            <div
              id={`${id}-desc`}
              className={fields.description}
            >
              { descriptionText }
            </div>
          )
        }
      </label>
    </div>
  )
}
