import * as React from 'react'

import InputCombobox from './input-combobox'
import InvalidMessage from './invalid-message'

import * as fields from '../../styles/fields.module.css'

import { OnOff } from '../../types/common'

interface OwnProps {
  id: string;
  name?: string;
  type: string;
  labelText: string;
  placeholder: string;
  autoCapitalize: OnOff;
  autoComplete: OnOff;
  autoCorrect: OnOff;
  className: string;
  invalidClassName: string;
  validClassName: string;
  invalidMessage: string;
  value: string;
  values: string[];
  invalid: boolean;
  valid: boolean;
  disabled?: boolean;
  required?: boolean;
  readOnly?: boolean;
  onChange (value: string): void;
  onClick (index: number): void;
  onBlur (index: number, value: string): void;
}

function LabeledCombobox ({
  id,
  invalid,
  className,
  labelText,
  invalidMessage,
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

        <InputCombobox
          id={id}
          invalid={invalid}
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

export default React.memo(LabeledCombobox)
