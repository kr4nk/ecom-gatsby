import classnames from 'classnames'
import { Link } from 'gatsby'
import * as React from 'react'

import SvgInvalid from '../../components/svg/invalid'

import * as sign from '../../styles/sign.module.css'
import * as utility from '../../styles/utility.module.css'

import {
  TImmutableInput,
  TImmutablePassword
} from '../../types/common'

import { INVALID } from '../../redux/selector-consts'

interface StateProps {
  agreed: boolean;
  isAccountExists: boolean;
  email: TImmutableInput;
  password: TImmutablePassword;
  passwordConfirm: TImmutableInput;
  errorMessage: string;
}

const ErrorBlock = ({
  email,
  password,
  passwordConfirm,
  // eslint-disable-next-line @getify/proper-arrows/params
  agreed,
  isAccountExists,
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
                email.get(INVALID) && (
                  <div className={sign.errorMessage}>
                    The email address is not valid.
                  </div>
                )
              }

              {
                password.get(INVALID) && (
                  <div className={sign.errorMessage}>
                    Password strength is lower than required
                  </div>
                )
              }

              {
                passwordConfirm.get(INVALID) && (
                  <div className={sign.errorMessage}>
                    Passwords is not match.
                  </div>
                )
              }

              {
                agreed || (
                  <div className={sign.errorMessage}>
                    You should agree the Terms of service to register.
                  </div>
                )
              }

              {
                isAccountExists && (
                  <div className={sign.errorMessage}>
                      Account already exists, do you want to <Link title='Reset Password' to='/reset' className={sign.errorLink}>reset your password</Link>?
                  </div>
                )
              }

              <div className={sign.errorMessage}>
                { errorMessage }
              </div>
            </div>
          </>
        )
        : (<></>)
    }
  </div>
)

export default ErrorBlock
