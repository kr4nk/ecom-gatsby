import { connect } from 'react-redux'

import { getIsFetching } from '../../redux/selectors/user-order'

import { changeCheckbox } from '../../redux/actions/fields'

import ButtonRefundCancel from '../common/button-refund-cancel'

import {
  Dispatch,
  ReduxState,
  TImmutableCheckbox
} from '../../types/common'

import { PATH } from '../../redux/selector-consts'

interface OwnProps {
  field: TImmutableCheckbox;
}

interface StateProps {
  disabled: boolean;
}

interface DispatchProps {
  onClick: React.MouseEventHandler;
}

const mapStateToProps = (state: ReduxState): StateProps => ({
  disabled: getIsFetching(state)
})

const mapDispatchToProps = (dispatch: Dispatch, { field }: OwnProps): DispatchProps => ({
  onClick (): void {
    dispatch(
      changeCheckbox({
        path: field.get(PATH),
        checked: false
      })
    )
  }
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ButtonRefundCancel)
