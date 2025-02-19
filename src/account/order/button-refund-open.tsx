import { connect } from 'react-redux'

import {
  getIsFetching,
  getRefundFieldOpen
} from '../../redux/selectors/user-order'

import { changeCheckbox } from '../../redux/actions/fields'

import ButtonRefundOpen from '../common/button-refund-open'

import { ReduxState, TImmutableCheckbox } from '../../types/common'

import { PATH } from '../../redux/selector-consts'

interface StateProps {
  disabled: boolean;
  field: TImmutableCheckbox;
}

interface DispatchProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  changeCheckbox (obj: any): void;
}

interface MergedProps {
  disabled: boolean;
  field: TImmutableCheckbox;
  onClick: React.MouseEventHandler;
}

const mapStateToProps = (state: ReduxState): StateProps => ({
  disabled: getIsFetching(state),
  field: getRefundFieldOpen(state)
})

const mapDispatchToProps: DispatchProps = {
  changeCheckbox
}

const mergeProps = ({ disabled, field }: StateProps, { changeCheckbox }: DispatchProps): MergedProps => ({
  disabled,
  field,
  onClick (): void {
    changeCheckbox({
      path: field.get(PATH),
      checked: true
    })
  }
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(ButtonRefundOpen)
