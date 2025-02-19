import * as React from 'react'
import classnames from 'classnames'
import Draft, { draftToHtml, htmlToDraft, EmptyState } from 'react-wysiwyg-typescript'
import { convertToRaw } from 'draft-js'

import InvalidMessage from './invalid-message'

import 'react-wysiwyg-typescript/index.css'

import { OnOff } from '../../types/common'

const wrapperStyle: React.CSSProperties = {
  boxSizing: 'border-box'
}

interface OwnProps {
  id: string;
  name?: string;
  ariaDescribedBy: string;
  wrapperId: number;
  labelText: string;
  placeholder: string;
  invalidMessage?: string;
  autoCapitalize: OnOff;
  autoComplete: OnOff;
  autoCorrect: OnOff;
  value: string;
  invalid: boolean;
  valid: boolean;
  disabled: boolean;
  required: boolean;
  className: string;
  inputClassName: string;
  labelClassName: string;
  validClassName: string;
  invalidClassName: string;
  onChange (value: string): void;
}

export default function LabeledEditor (props: OwnProps): JSX.Element {
  const [ state, setState ] = React.useState(EmptyState)

  React.useEffect(
    function onChangeValue (): void {
      setState(
        htmlToDraft(props.value)
      )
    }, [ props.value ]
  )

  const onEditorStateChange = React.useCallback(
    function onChangeState (editor: Draft.EditorState): void {
      setState(editor)
    }, []
  )

  const onEditorBlur = React.useCallback<React.ReactEventHandler>(
    function onEditorBlur (): void {
      const value = draftToHtml(
        convertToRaw(state.getCurrentContent())
      )

      props.onChange(value)
    }, [ props, state ]
  )

  return (
    <div className={props.className}>
      <label
        htmlFor={props.id}
        className={props.labelClassName}
      >
        { props.labelText }

        <Draft
          id={props.id}
          wrapperId={props.wrapperId}
          ariaDescribedBy={props.ariaDescribedBy}
          name={props.name}
          placeholder={props.placeholder}
          autoCapitalize={props.autoCapitalize}
          autoComplete={props.autoComplete}
          autoCorrect={props.autoCorrect}

          wrapperClassName={
            classnames(props.inputClassName, {
              [props.validClassName]: props.valid,
              [props.invalidClassName]: props.invalid
            })
          }
          wrapperStyle={wrapperStyle}
          editorState={state}
          disabled={props.disabled}
          required={props.required}
          onEditorStateChange={onEditorStateChange}
          onBlur={onEditorBlur}
        />
      </label>

      {
        props.invalid && (
          <InvalidMessage
            value={props.invalidMessage}
            id={`${props.id}-desc`}
          />
        )
      }
    </div>
  )
}
