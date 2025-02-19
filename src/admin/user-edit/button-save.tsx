import { connect } from 'react-redux'

import { getIsFetching } from '../../redux/selectors/admin-user-edit'

import ButtonSave from '../common/button-save'

import { ReduxState } from '../../types/common'

interface StateProps {
  disabled: boolean;
}

const mapStateToProps = (state: ReduxState): StateProps => ({
  disabled: getIsFetching(state)
})

export default connect(
  mapStateToProps
)(ButtonSave)
