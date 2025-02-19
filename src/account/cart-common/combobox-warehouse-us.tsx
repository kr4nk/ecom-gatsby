import classnames from 'classnames'
import { connect } from 'react-redux'

import { getWarehouses } from '../../redux/selectors/user-warehouses'
import { getIsFetching, getFieldWarehouse } from '../../redux/selectors/user-cart'

import Combobox from '../../components/fields/combobox'

import * as grid from '../../styles/grid.module.css'
import * as fields from '../../styles/fields.module.css'

import {
  ReduxState,
  ComboboxItem,
  TImmutableCombobox
} from '../../types/common'

interface StateProps {
  id: string;
  name: string;
  labelText: string;
  placeholder: string;
  invalidMessage: string;
  className: string;
  disabled: boolean;
  values: ComboboxItem[];
  field: TImmutableCombobox;
}

const mapStateToProps = (state: ReduxState): StateProps => ({
  id: 'warehouse',
  name: 'warehouse',
  labelText: 'Warehouse *',
  placeholder: 'Select a closest warehouse',
  invalidMessage: 'Please select a warehouse',
  className: classnames(
    fields.field,
    grid.colMd4
  ),
  disabled: getIsFetching(state),
  values: getWarehouses(state),
  field: getFieldWarehouse(state)
})

const ComboboxWarehouseUs = connect(
  mapStateToProps
)(Combobox)

export default ComboboxWarehouseUs
