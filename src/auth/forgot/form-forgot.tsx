import { connect } from 'react-redux'

import { submitForgot } from '../../redux/actions/auth-forgot'

import FormForgot from '../common/form-forgot'

import { Dispatch } from '../../types/common'

interface DispatchProps {
  onSubmit: React.FormEventHandler;
}

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
  onSubmit (e): void {
    e.preventDefault()

    dispatch(
      submitForgot()
    )
  }
})

export default connect(
  null,
  mapDispatchToProps
)(FormForgot)
