import { connect } from 'react-redux'

import { updateUser } from '../../redux/actions/admin-user-edit'

import FormEdit from './src/form-edit'

import { Dispatch } from '../../types/common'

interface DispatchProps {
  onSubmit: React.FormEventHandler;
}

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
  onSubmit (e): void {
    e.preventDefault()

    dispatch(
      updateUser()
    )
  }
})

export default connect(
  null,
  mapDispatchToProps
)(FormEdit)
