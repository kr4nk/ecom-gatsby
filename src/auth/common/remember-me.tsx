import classnames from 'classnames'
import { Link } from 'gatsby'
import * as React from 'react'

import * as sign from '../../styles/sign.module.css'
import * as utility from '../../styles/utility.module.css'

import { TImmutableCheckbox } from '../../types/common'

import { CHECKED } from '../../redux/selector-consts'

interface StateProps {
  disabled: boolean;
  params: TImmutableCheckbox;
}

interface DispatchProps {
  onChange: React.ChangeEventHandler;
}

const RememberMe = ({ disabled, params, onChange }: StateProps & DispatchProps): JSX.Element => (
  <div
    className={
      classnames(
        utility.df,
        utility.fdr,
        utility.jcsb,
        sign.row
      )
    }
  >
    <label
      htmlFor='rememberme'
      className={
        classnames(
          sign.remember,
          utility.df,
          utility.fdr,
          utility.jcsb,
          utility.aic
        )
      }
    >
      <input
        id='rememberme'
        name='rememberme'
        type='checkbox'
        className={sign.checkbox}
        aria-checked={params.get(CHECKED)}
        checked={params.get(CHECKED)}
        disabled={disabled}
        onChange={onChange}
      />

      Remember Me
    </label>

    <Link
      title='Reset Password'
      to='/forgot'
      className={
        classnames(
          sign.labelLink,
          sign.forgot,
          utility.tar
        )
      }
    >
      Forgot password?
    </Link>
  </div>
)

export default RememberMe
