import classnames from 'classnames'
import { connect } from 'react-redux'

import {
  getIsFetching,
  getFieldStateUs
} from '../../redux/selectors/user-cart'

import Combobox from '../../components/fields/combobox'

import values from '../../const/states-us'

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
  className: classnames(
    fields.field,
    grid.colMd1
  ),
  disabled: getIsFetching(state),
  values,
  field: getFieldStateUs(state)
})

const ComboboxStateUs = connect(
  mapStateToProps
)(Combobox)

export default ComboboxStateUs
