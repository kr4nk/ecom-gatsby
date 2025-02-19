import * as React from 'react'
import { Link } from 'gatsby'
import classnames from 'classnames'

import * as sign from '../../styles/sign.module.css'
import * as utility from '../../styles/utility.module.css'

import { TImmutableCheckbox } from '../../types/common'

import { CHECKED } from '../../redux/selector-consts'

interface StateProps {
  params: TImmutableCheckbox;
  disabled: boolean;
  required?: boolean;
}

interface DispatchProps {
  onChange: React.ChangeEventHandler;
}

const Agreed = ({
  params,
  disabled,
  required,
  // eslint-disable-next-line @getify/proper-arrows/params
  onChange
}: StateProps & DispatchProps): JSX.Element => (
  <div
    className={
      classnames(
        utility.df,
        utility.fdr,
        sign.row
      )
    }
  >
    <label
      htmlFor='agreed'
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
        id='agreed'
        name='agreed'
        type='checkbox'
        className={sign.checkbox}
        aria-checked={params.get(CHECKED)}
        checked={params.get(CHECKED)}
        disabled={disabled}
        required={required}
        onChange={onChange}
      />

      {"I'm agree with"}
    </label>

    &nbsp;

    <Link
      title='Privacy & Terms Of Service'
      className={
        classnames(
          sign.labelLink,
          utility.tar
        )
      }
      to='/privacy'
    >
      Terms of service
    </Link>
  </div>
)

export default Agreed
