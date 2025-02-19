import * as React from 'react'
import classnames from 'classnames'

import SvgInvalid from '../../components/svg/invalid'

import * as utility from '../../styles/utility.module.css'
import * as sign from '../../styles/sign.module.css'

interface OwnProps {
  errorMessage: string;
}

const ErrorMessageRegistration = ({ errorMessage }: OwnProps): JSX.Element => {
  return errorMessage.length > 0
    ? (
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
        <div
          role='img'
          aria-label='Error'
          className={sign.errorIcon}
        >
          <SvgInvalid />
        </div>

        <div className={sign.errorMessage}>
          { errorMessage }
        </div>
      </div>
    )
    : (<></>)
}

export default ErrorMessageRegistration
