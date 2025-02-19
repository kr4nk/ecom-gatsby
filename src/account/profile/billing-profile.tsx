import { connect } from 'react-redux'

import { getUser } from '../../redux/selectors/user'

import {
  getIsFetching,
  getIsEdited,
  getFieldCountry
} from '../../redux/selectors/user-profile'

import {
  saveBillingAddress,
  editBillingAddress
} from '../../redux/actions/user-profile'

import BillingProfile from '../common/billing-profile'

import { TUserData } from '../../types/user'
import { ReduxState, TImmutableInput } from '../../types/common'

import { VALUE } from '../../redux/selector-consts'

interface StateProps {
  isEdited: TImmutableInput;
  isFetching: boolean;
  country: string;
  user: TUserData;
}

interface DispatchProps {
  saveBillingAddress: React.MouseEventHandler;
  editBillingAddress: React.MouseEventHandler;
}

const mapStateToProps = (state: ReduxState): StateProps => ({
  isFetching: getIsFetching(state),
  isEdited: getIsEdited(state),
  user: getUser(state),
  country: getFieldCountry(state)
    .get(VALUE)
})

const mapDispatchToProps: DispatchProps = {
  saveBillingAddress,
  editBillingAddress
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BillingProfile)
