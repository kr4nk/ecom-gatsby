import * as React from 'react'

import InputSelect from './input-select'
import InvalidMessage from './invalid-message'

import * as fields from '../../styles/fields.module.css'

interface OwnProps {
  id: string;
  name?: string;
  labelText: string;
  placeholder: string;
  invalidMessage: string;
  value: string;
  values: string[];
  invalid: boolean;
  valid: boolean;
  disabled?: boolean;
  required?: boolean;
  className: string;
  invalidClassName: string;
  validClassName: string;
  onClick (index: number): void;
  onBlur (index: number, value: string): void;
  onFocus (): void;
}

function LabeledSelect ({
  id,
  className,
  labelText,
  invalidMessage,
  invalid,
  ...rest
}: OwnProps): JSX.Element {
  return (
    <div className={className}>
      <label
        id={`${id}-label`}
        htmlFor={id}
        className={fields.label}
      >
        {
          labelText
        }

        <InputSelect
          id={id}
          readOnly
          invalid={invalid}
          autoCapitalize='off'
          autoComplete='off'
          autoCorrect='off'

          {...rest}
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

export default React.memo(LabeledSelect)
