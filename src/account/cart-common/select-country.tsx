import { connect } from 'react-redux'
import classnames from 'classnames'

import { getIsFetching, getFieldCountry } from '../../redux/selectors/user-cart'

import Select from '../../components/fields/select'

import values from '../../const/countries'

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
  id: 'country',
  name: 'country',
  labelText: 'Country *',
  placeholder: 'Country',
  invalidMessage: 'Please select your Country',
  className: classnames(
    fields.field,
    grid.colMd1
  ),
  disabled: getIsFetching(state),
  params: getFieldCountry(state),
  values
})

const SelectCountry = connect(
  mapStateToProps
)(Select)

export default SelectCountry
