import { connect } from 'react-redux'

import { resetPassword } from '../../redux/actions/auth-password'

import FormPassword from '../common/form-password'

import { Dispatch } from '../../types/common'

interface DispatchProps {
  onSubmit: React.FormEventHandler;
}

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
  onSubmit (event): void {
    event.preventDefault()

    dispatch(
      resetPassword()
    )
  }
})

export default connect(
  null,
  mapDispatchToProps
)(FormPassword)
