import { connect } from 'react-redux'

import {
  getIsFetching,
  getFieldAgreed
} from '../../redux/selectors/auth-password'

import { changeCheckbox } from '../../redux/actions/fields'

import Agreed from '../common/agreed-password'

import { ReduxState, TImmutableCheckbox } from '../../types/common'

import { PATH } from '../../redux/selector-consts'

interface StateProps {
  params: TImmutableCheckbox;
  disabled: boolean;
}

interface DispatchProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  changeCheckbox(obj: any): void;
}

interface MergedProps {
  disabled: boolean;
  required: boolean;
  params: TImmutableCheckbox;
  onChange: React.ChangeEventHandler;
}

const mapStateToProps = (state: ReduxState): StateProps => ({
  disabled: getIsFetching(state),
  params: getFieldAgreed(state)
})

const mapDispatchToProps: DispatchProps = {
  changeCheckbox
}

const mergeProps = ({ disabled, params }: StateProps, { changeCheckbox }: DispatchProps): MergedProps => ({
  required: true,
  disabled,
  params,
  onChange ({ target: { checked } }: React.ChangeEvent<HTMLInputElement>): void {
    changeCheckbox({
      path: params.get(PATH),
      checked
    })
  }
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(Agreed)
