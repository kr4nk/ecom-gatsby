import classnames from 'classnames'
import { Link } from 'gatsby'
import { Map } from 'immutable'
import * as React from 'react'

import SvgInvalid from '../../components/svg/invalid'

import * as sign from '../../styles/sign.module.css'
import * as utility from '../../styles/utility.module.css'

import { VALUE, INVALID } from '../../redux/selector-consts'

interface StateProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  params: Map<string, any>;
  isAccountExists: boolean;
  errorMessage: string;
}

const ErrorBlock = ({ params, errorMessage, isAccountExists }: StateProps): JSX.Element => (
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
              <div className={sign.errorMessage}>
                { errorMessage }
              </div>

              {
                params.get(INVALID) && (
                  <div className={sign.errorMessage}>
                    The email address { params.get(VALUE) } is not valid.
                  </div>
                )
              }

              {
                isAccountExists || (
                  <div className={sign.errorMessage}>
                    Account does not exist. Do you want to&nbsp;

                    <Link
                      title='Sign Up'
                      to='/signup'
                      className={sign.errorLink}
                    >
                      Sign Up
                    </Link>

                    ?
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
