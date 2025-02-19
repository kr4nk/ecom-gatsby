import classnames from 'classnames'
import { connect } from 'react-redux'

import {
  getIsFetching,
  getFieldRole
} from '../../redux/selectors/admin-user-edit'

import Select from '../../components/fields/select'

import values from '../../const/status-user-admin'

import * as grid from '../../styles/grid.module.css'
import * as fields from '../../styles/fields.module.css'

import { ReduxState, TImmutableInput } from '../../types/common'

interface StateProps {
  id: string;
  name: string;
  labelText: string;
  placeholder: string;
  invalidMessage: string;
  className: string;
  disabled: boolean;
  values: string[];
  params: TImmutableInput;
}

const mapStateToProps = (state: ReduxState): StateProps => ({
  id: 'type',
  name: 'type',
  labelText: 'Type *',
  placeholder: 'Type',
  invalidMessage: 'Please select type',
  className: classnames(
    fields.field,
    grid.colMd2
  ),
  disabled: getIsFetching(state),
  values,
  params: getFieldRole(state)
})

const SelectType = connect(
  mapStateToProps
)(Select)

export default SelectType
