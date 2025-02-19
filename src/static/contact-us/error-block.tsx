import * as React from 'react'
import { connect } from 'react-redux'
import classnames from 'classnames'

import {
  getFieldMessage,
  getFieldAgreed,
  getFieldEmail,
  getIsValid
} from '../../redux/selectors/default-contact-us'

import * as emailInputBox from '../../styles/email-input-box.module.css'
import * as utility from '../../styles/utility.module.css'

import {
  ReduxState,
  TImmutableInput,
  TImmutableCheckbox
} from '../../types/common'

import {
  INVALID,
  CHECKED
} from '../../redux/selector-consts'

interface OwnProps {
  isValid: boolean;
  email: TImmutableInput;
  agreed: TImmutableCheckbox;
  message: TImmutableInput;
}

// eslint-disable-next-line perf-standard/check-function-inline
function ErrorBlock ({ email, agreed, message, isValid }: OwnProps): JSX.Element {
  return isValid
    ? (<></>)
    : (
      <div
        className={
          classnames(
            emailInputBox.warning,
            utility.tac,
            utility.bold
          )
        }
      >
        {
          email.get(INVALID) && (
            <p>Please enter correct email address!</p>
          )
        }

        {
          agreed.get(CHECKED) || (
            <p>Please check privacy policy!</p>
          )
        }

        {
          message.get(INVALID) && (
            <p>Please enter message</p>
          )
        }
      </div>
    )
}

const mapStateToProps = (state: ReduxState): OwnProps => ({
  isValid: getIsValid(state),
  email: getFieldEmail(state),
  agreed: getFieldAgreed(state),
  message: getFieldMessage(state)
})

export default connect(
  mapStateToProps
)(ErrorBlock)
