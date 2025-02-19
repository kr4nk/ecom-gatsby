import * as React from 'react'

import SvgSearch from '../svg/search'

import LabeledInput from './labeled-input'

import { OnOff } from '../../types/common'

interface OwnProps {
  className: string;
  inputClassName: string;
  labelClassName: string;
  iconClassName: string;
  value: string;
  onChange: React.ChangeEventHandler;
  onFocus?: React.FocusEventHandler;
  onBlur?: React.FocusEventHandler;
}

interface DefaultProps {
  id: string;
  type: string;
  labelText: string;
  placeholder: string;
  autoCapitalize: OnOff;
  autoComplete: OnOff;
  autoCorrect: OnOff;
  icon: React.ReactNode;
  valid: boolean;
  invalid: boolean;
  validClassName: string;
  invalidClassName: string;
}

export default function InputSearch (props: OwnProps & DefaultProps): JSX.Element {
  return (
    <LabeledInput {...props} />
  )
}

InputSearch.defaultProps = {
  id: 'search',
  type: 'search',
  labelText: 'Search',
  placeholder: 'Type to search...',
  autoCapitalize: 'off' as OnOff,
  autoComplete: 'off' as OnOff,
  autoCorrect: 'on' as OnOff,
  icon: <SvgSearch />,
  valid: false,
  invalid: false,
  validClassName: '',
  invalidClassName: ''
}
