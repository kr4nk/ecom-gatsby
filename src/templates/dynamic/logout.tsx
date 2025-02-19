import * as React from 'react'
import { connect } from 'react-redux'

import { logOut } from '../../redux/actions/user'

interface DispatchProps {
  logOut(): void;
}

function Logout ({ logOut }: DispatchProps): JSX.Element {
  React.useEffect(
    function mountComponent (): void {
      logOut()
    }, [ logOut ]
  )

  return (<></>)
}

const mapDispatchToProps: DispatchProps = {
  logOut
}

export default connect(
  null,
  mapDispatchToProps
)(Logout)
