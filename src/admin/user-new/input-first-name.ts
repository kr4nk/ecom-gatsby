import classnames from 'classnames'
import { connect } from 'react-redux'

import {
  getIsFetching,
  getFieldFirstName
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
  id: 'firstName',
  name: 'given-name',
  labelText: 'First name *',
  placeholder: 'First name',
  autoCapitalize: 'on' as OnOff,
  autoComplete: 'on' as OnOff,
  autoCorrect: 'off' as OnOff,
  className: classnames(
    fields.field,
    grid.colMd2
  ),
  disabled: getIsFetching(state),
  params: getFieldFirstName(state)
})

const InputFirstName = connect(
  mapStateToProps
)(Input)

export default InputFirstName
