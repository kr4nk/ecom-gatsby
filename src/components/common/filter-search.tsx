import * as React from 'react'

import InputSearch from './input-search'

import * as fields from '../../styles/fields.module.css'

interface OwnProps {
  inputClassName?: string;
  labelClassName?: string;
  iconClassName?: string;

  className: string;
  value: string;

  onChange: React.ChangeEventHandler;
  onFocus?: React.FocusEventHandler;
  onBlur?: React.FocusEventHandler;
}

interface DefaultProps {
  inputClassName: string;
  labelClassName: string;
  iconClassName: string;
}

export default function FilterSearch (props: OwnProps & DefaultProps): JSX.Element {
  return (
    <InputSearch {...props} />
  )
}

FilterSearch.defaultProps = {
  inputClassName: fields.input,
  labelClassName: fields.label,
  iconClassName: fields.icon
}
