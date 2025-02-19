import * as React from 'react'
import classnames from 'classnames'

import * as passwordHint from '../../styles/password-hint.module.css'

interface OwnProps {
  capsLock?: boolean;
  passLength: boolean;
  capital: boolean;
  lowercase: boolean;
  digit: boolean;
}

function PasswordHint (props: OwnProps): JSX.Element {
  return (
    <div
      role='status'
      aria-live='polite'
      aria-relevant='all'
      className={passwordHint.box}
    >
      Security policy requires strong password.

      <ul className={passwordHint.list}>
        <li
          aria-invalid={!props.passLength}
          className={
            classnames(
              passwordHint.item,
              props.passLength ? passwordHint.valid : passwordHint.invalid
            )
          }
        >
          minimum length 8 characters
        </li>

        <li
          aria-invalid={!props.capital}
          className={
            classnames(
              passwordHint.item,
              props.capital ? passwordHint.valid : passwordHint.invalid
            )
          }
        >
          at least one capital letter
        </li>

        <li
          aria-invalid={!props.lowercase}
          className={
            classnames(
              passwordHint.item,
              props.lowercase ? passwordHint.valid : passwordHint.invalid
            )
          }
        >
          at least one lowercase letter
        </li>

        <li
          aria-invalid={!props.digit}
          className={
            classnames(
              passwordHint.item,
              props.digit ? passwordHint.valid : passwordHint.invalid
            )
          }
        >
          at least one digit
        </li>

        {
          props.capsLock && (
            <li
              className={
                classnames(
                  passwordHint.item,
                  passwordHint.invalid
                )
              }
            >
              Caps lock enabled
            </li>
          )
        }
      </ul>
    </div>
  )
}

export default React.memo(PasswordHint)
