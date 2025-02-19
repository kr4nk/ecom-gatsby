import * as React from 'react'
import { connect } from 'react-redux'
import classnames from 'classnames'

import { validateInput } from '../../redux/actions/fields'

import { sanitizeEmail } from '../../utils/sanitize-email'
import { emailRegexp } from '../../utils/regexp'

import {
  getIsFetching,
  getFieldEmail
} from '../../redux/selectors/default-contact-us'

import InputCustom from '../../components/fields/input-custom'

import SvgEmail from '../../components/svg/email'

import * as grid from '../../styles/grid.module.css'
import * as fields from '../../styles/fields.module.css'

import {
  ReduxState,
  Dispatch,
  OnOff,
  TImmutablePaths,
  TImmutableInput
} from '../../types/common'

interface StateProps {
  id: string;
  name: string;
  type: string;
  labelText: string;
  placeholder: string;
  autoCapitalize: OnOff;
  autoComplete: OnOff;
  autoCorrect: OnOff;
  icon: React.ReactNode;
  className: string;
  disabled: boolean;
  params: TImmutableInput;
}

interface DispatchProps {
  onChange (value: string, path: TImmutablePaths): void;
  onBlur (): void;
}

const mapStateToProps = (state: ReduxState): StateProps => ({
  id: 'email',
  name: 'email',
  type: 'email',
  labelText: 'Email',
  placeholder: 'email@example.com',

  autoCapitalize: 'off' as OnOff,
  autoComplete: 'on' as OnOff,
  autoCorrect: 'off' as OnOff,

  icon: <SvgEmail />,
  className: classnames(
    fields.field,
    grid.colMd2
  ),
  disabled: getIsFetching(state),
  params: getFieldEmail(state)
})

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
  onChange (value: string, path: TImmutablePaths): void {
    value = sanitizeEmail(value)

    const isValid = (
      value.length > 5 &&
      value.length <= 320
    ) && emailRegexp(value)

    dispatch(
      validateInput({
        path, value, isValid
      })
    )
  },
  onBlur (): void {}
})

const InputEmail = connect(
  mapStateToProps,
  mapDispatchToProps
)(InputCustom)

export default InputEmail
