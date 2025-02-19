import { connect } from 'react-redux'

import { createUser } from '../../redux/actions/admin-user-new'

import FormNew from './src/form-new'

import { Dispatch } from '../../types/common'

interface DispatchProps {
  onSubmit: React.FormEventHandler;
}

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
  onSubmit (e): void {
    e.preventDefault()

    dispatch(
      createUser()
    )
  }
})

export default connect(
  null,
  mapDispatchToProps
)(FormNew)
