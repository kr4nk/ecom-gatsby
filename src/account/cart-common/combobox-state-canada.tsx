import { connect } from 'react-redux'
import classnames from 'classnames'

import {
  getIsFetching,
  getFieldStateCanada
} from '../../redux/selectors/user-cart'

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
  autoCapitalize: OnOff;
  autoComplete: OnOff;
  autoCorrect: OnOff;
  className: string;
  disabled: boolean;
  values: ComboboxItem[];
  field: TImmutableCombobox;
}

const mapStateToProps = (state: ReduxState): StateProps => ({
  id: 'state',
  name: 'address-level2',
  labelText: 'State *',
  placeholder: 'State',
  invalidMessage: 'Please select state',
  autoCapitalize: 'on' as OnOff,
  autoComplete: 'on' as OnOff,
  autoCorrect: 'on' as OnOff,
  values,
  disabled: getIsFetching(state),
  className: classnames(fields.field, grid.colMd1),
  field: getFieldStateCanada(state)
})

const ComboboxStateCanada = connect(
  mapStateToProps
)(Combobox)

export default ComboboxStateCanada
