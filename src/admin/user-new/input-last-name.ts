import classnames from 'classnames'
import { connect } from 'react-redux'

import {
  getIsFetching,
  getFieldLastName
} from '../../redux/selectors/admin-user-new'

import Input from '../../components/fields/input'

import * as grid from '../../styles/grid.module.css'
import * as fields from '../../styles/fields.module.css'

import {
  ReduxState,
  TImmutableInput,
  OnOff
} from '../../types/common'

interface StateProps {
  id: string;
  name: string;
  labelText: string;
  placeholder: string;
  autoCapitalize: OnOff;
  autoComplete: OnOff;
  autoCorrect: OnOff;
  className: string;
  disabled: boolean;
  params: TImmutableInput;
}

const mapStateToProps = (state: ReduxState): StateProps => ({
  id: 'lastName',
  name: 'family-name',
  labelText: 'Last name *',
  placeholder: 'Last name',
  autoComplete: 'on' as OnOff,
  autoCapitalize: 'on' as OnOff,
  autoCorrect: 'off' as OnOff,
  className: classnames(
    fields.field,
    grid.colMd2
  ),
  disabled: getIsFetching(state),
  params: getFieldLastName(state)
})

const InputLastName = connect(
  mapStateToProps
)(Input)

export default InputLastName
