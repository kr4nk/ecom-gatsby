import classnames from 'classnames'
import * as React from 'react'

import SvgExclamation from '../../components/svg/exclamation'

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
          <SvgExclamation />
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
        </div>
      </div>
    )
    : (<></>)
}

export default ErrorBlock
