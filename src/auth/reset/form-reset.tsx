import { connect } from 'react-redux'

import { submitResetAndSignIn } from '../../redux/actions/auth-reset'

import FormReset from '../common/form-reset'

import { Dispatch } from '../../types/common'

interface DispatchProps {
  onSubmit: React.FormEventHandler;
}

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
  onSubmit (event): void {
    event.preventDefault()

    dispatch(
      submitResetAndSignIn()
    )
  }
})

export default connect(
  null,
  mapDispatchToProps
)(FormReset)
