import { connect } from 'react-redux'

import { selectCombobox } from '../../redux/actions/fields'

import PaymentCard from '../common/payment-card'

import { Dispatch, TImmutableInput } from '../../types/common'

import { PATH } from '../../redux/selector-consts'

interface OwnProps {
  params: TImmutableInput;
  selected: boolean;
  type: string;
}

interface DispatchProps {
  onClick: React.MouseEventHandler;
}

const mapDispatchToProps = (dispatch: Dispatch, { params, type }: OwnProps): DispatchProps => ({
  onClick (): void {
    dispatch(
      selectCombobox({
        path: params.get(PATH),
        value: type
      })
    )
  }
})

export default connect(
  null,
  mapDispatchToProps
)(PaymentCard)
