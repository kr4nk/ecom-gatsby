import * as React from 'react'
import classnames from 'classnames'

import SvgInvalid from '../../components/svg/invalid'

import * as sign from '../../styles/sign.module.css'
import * as utility from '../../styles/utility.module.css'

import {
  TImmutableInput,
  TImmutablePassword
} from '../../types/common'

import { INVALID } from '../../redux/selector-consts'

interface StateProps {
  email: string;
  password: TImmutablePassword;
  passwordConfirm: TImmutableInput;
  code: TImmutableInput;
  errorMessage: string;
}

const ErrorBlock = ({
  email,
  password,
  passwordConfirm,
  // eslint-disable-next-line @getify/proper-arrows/params
  code,
  errorMessage
}: StateProps): JSX.Element => (
  <div
    className={
      classnames(
        utility.df,
        utility.fdr,
        utility.aic,
        sign.error
      )
    }
  >
    {
      // eslint-disable-next-line @getify/proper-arrows/return
      errorMessage.length > 0
        ? (
          <>
            <div
              role='img'
              aria-label='Error'
              className={sign.errorIcon}
            >
              <SvgInvalid />
            </div>

            <div
              className={
                classnames(
                  utility.df,
                  utility.fdc,
                  utility.aic
                )
              }
            >
              {
                email || (
                  <div className={sign.errorMessage}>
                    Username is empty!
                  </div>
                )
              }

              {
                password.get(INVALID) && (
                  <div className={sign.errorMessage}>
                    New password is not strong enough!
                  </div>
                )
              }

              {
                passwordConfirm.get(INVALID) && (
                  <div className={sign.errorMessage}>
                    Passwords do not match!
                  </div>
                )
              }

              <div className={sign.errorMessage}>
                { errorMessage }
              </div>

              {
                code.get(INVALID) && (
                  <div className={sign.errorMessage}>
                    Confirmation Code is incorrect!
                  </div>
                )
              }
            </div>
          </>
        )
        : (<></>)
    }
  </div>
)

export default ErrorBlock
