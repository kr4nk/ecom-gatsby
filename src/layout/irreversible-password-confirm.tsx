import * as React from 'react'
import { connect } from 'react-redux'
import classnames from 'classnames'

import { CognitoError } from '../aws/amplify'

import { confirmAction } from '../redux/actions/user'

import InvalidMessage from '../components/common/invalid-message'

import * as fields from '../styles/fields.module.css'
import * as utility from '../styles/utility.module.css'

import ConfirmControls from './modal-confirm-controls'

interface OwnProps {
  focusRef: React.MutableRefObject<HTMLElement | null>;
  onConfirm (): void;
  onClose (): void;
}

interface DispatchProps {
  confirmAction (value: string, callback: (err?: CognitoError) => void): void;
}

function IrreversiblePasswordConfirm (props: OwnProps & DispatchProps): JSX.Element {
  const fakeRef = React.useRef<HTMLElement | null>(null)
  const [ value, setValue ] = React.useState('')
  const [ error, setError ] = React.useState('')
  const [ loading, setLoading ] = React.useState(false)

  const confirmCallback = React.useCallback(
    function confirmCallback (err?: CognitoError): void {
      const invalid = err !== undefined

      const error = err !== undefined
        ? err.message
        : ''

      setError(error)
      setLoading(false)

      if (!invalid) {
        props.onConfirm()
        props.onClose()
      }
    }, [ props ]
  )

  const onConfirm = React.useCallback<React.MouseEventHandler>(
    function onConfirm (): void {
      setLoading(true)

      props.confirmAction(value, confirmCallback)
    }, [ props, value, confirmCallback ]
  )

  const onChange = React.useCallback<React.ChangeEventHandler<HTMLInputElement>>(
    function onChange ({ target: { value } }): void {
      setValue(value)
    }, []
  )

  return (
    <div>
      <label
        id='password-label'
        htmlFor='password'
        className={
          classnames(
            fields.label,
            fields.field
          )
        }
      >
        Confirm your password

        <input
          id='password'
          ref={props.focusRef as React.MutableRefObject<HTMLInputElement>}
          aria-invalid={error.length > 0}
          aria-labelledby='password-label'
          aria-describedby='password-desc'
          className={
            classnames(
              fields.input,
              utility.normal, {
                [fields.invalid]: error.length > 0
              }
            )
          }
          type='password'
          value={value}
          onChange={onChange}
        />

        {
          error.length > 0 && (
            <InvalidMessage
              value={error}
              id='password-desc'
            />
          )
        }
      </label>

      <ConfirmControls
        disabled={
          loading ||
          value.length === 0
        }
        focusRef={fakeRef}
        onConfirm={onConfirm}
        onClose={props.onClose}
      />
    </div>
  )
}

const mapDispatchToProps: DispatchProps = {
  confirmAction
}

export default connect(
  null,
  mapDispatchToProps
)(IrreversiblePasswordConfirm)
