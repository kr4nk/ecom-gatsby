import { connect } from 'react-redux'

import { payForOrder } from '../../redux/actions/user-order'

import PaymentCardForm from '../common/payment-card-form'

import { Dispatch } from '../../types/common'

interface DispatchProps {
  onSubmit: React.FormEventHandler;
}

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
  onSubmit (e): void {
    e.preventDefault()

    dispatch(
      payForOrder()
    )
  }
})

export default connect(
  null,
  mapDispatchToProps
)(PaymentCardForm)
