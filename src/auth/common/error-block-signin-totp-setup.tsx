import classnames from 'classnames'
import * as React from 'react'

import SvgInvalid from '../../components/svg/invalid'

import * as sign from '../../styles/sign.module.css'
import * as utility from '../../styles/utility.module.css'

interface StateProps {
  errorMessage: string;
}

const ErrorBlock = ({ errorMessage }: StateProps): JSX.Element => {
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

export default ErrorBlock
