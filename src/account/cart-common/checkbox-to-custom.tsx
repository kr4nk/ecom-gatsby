import { connect } from 'react-redux'
import classnames from 'classnames'

import { getFieldFromWarehouseToCustom } from '../../redux/selectors/user-cart'

import Checkbox from '../../components/fields/checkbox'

import * as grid from '../../styles/grid.module.css'
import * as fields from '../../styles/fields.module.css'

import { ReduxState, TImmutableCheckbox } from '../../types/common'

interface StateProps {
  id: string;
  labelText: string;
  checkboxText: string;
  descriptionText: string;
  className: string;
  params: TImmutableCheckbox;
}

const mapStateToProps = (state: ReduxState): StateProps => ({
  id: 'from-warehouse-to-custom',
  labelText: '',
  checkboxText: 'Pickup not to the business address',
  descriptionText: 'For correct tax calculation',

  className: classnames(
    fields.field,
    grid.colMd2
  ),
  params: getFieldFromWarehouseToCustom(state)
})

const CheckboxToCustom = connect(
  mapStateToProps
)(Checkbox)

export default CheckboxToCustom
