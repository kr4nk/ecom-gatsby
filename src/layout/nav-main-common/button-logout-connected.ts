import { connect } from 'react-redux'

import { logOut } from '../../redux/actions/user'

import ButtonLogout from './button-logout'

const options = { forwardRef: true }

interface DispatchProps {
  onClick: React.MouseEventHandler;
}

const mapDispatchToProps: DispatchProps = {
  onClick: logOut
}

export default connect(
  null,
  mapDispatchToProps,
  null,
  options
)(ButtonLogout)
