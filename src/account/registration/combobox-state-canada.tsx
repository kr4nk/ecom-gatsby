import classnames from 'classnames'
import { connect } from 'react-redux'

import {
  getIsFetching,
  getFieldStateCanada
} from '../../redux/selectors/user-registration'

import Combobox from '../../components/fields/combobox'

import values from '../../const/states-canada'

import * as grid from '../../styles/grid.module.css'
import * as fields from '../../styles/fields.module.css'

import {
  ReduxState,
  OnOff,
  ComboboxItem,
  TImmutableCombobox
} from '../../types/common'

interface StateProps {
  id: string;
  name: string;
  labelText: string;
  placeholder: string;
  invalidMessage: string;
  autoCorrect: OnOff;
  autoComplete: OnOff;
  className: string;
  disabled: boolean;
  field: TImmutableCombobox;
  values: ComboboxItem[];
}

const mapStateToProps = (state: ReduxState): StateProps => ({
  id: 'state',
  name: 'address-level2',
  labelText: 'State *',
  placeholder: 'State',
  invalidMessage: 'Please select state',

  autoCorrect: 'on' as OnOff,
  autoComplete: 'on' as OnOff,

  className: classnames(
    fields.field,
    grid.colMd1
  ),
  disabled: getIsFetching(state),
  field: getFieldStateCanada(state),
  values
})

const ComboboxStateCanada = connect(
  mapStateToProps
)(Combobox)

export default ComboboxStateCanada
