import * as React from 'react'
import classnames from 'classnames'
import { connect } from 'react-redux'

import { getIsMenuOpen } from '../../redux/selectors/app'

import { toggleMobileMenu } from '../../redux/actions/app'

import * as buttons from '../../styles/buttons.module.css'
import * as utility from '../../styles/utility.module.css'

import { ReduxState } from '../../types/common'

interface OwnProps {
  children: React.ReactNode;
}

interface StateProps {
  isOpen: boolean;
}

interface DispatchProps {
  onClick: React.MouseEventHandler;
}

function ButtonMobile (props: OwnProps & StateProps & DispatchProps): JSX.Element {
  return (
    <div className={utility.full}>
      <button
        className={
          classnames(
            buttons.button,
            buttons.buttonSecondary,
            utility.roboto,
            utility.ttu,
            utility.full
          )
        }
        onClick={props.onClick}
        type='button'
      >
        Menu
      </button>

      {
        props.isOpen
          ? props.children
          : (<></>)
      }
    </div>
  )
}

const mapStateToProps = (state: ReduxState): StateProps => ({
  isOpen: getIsMenuOpen(state)
})

const mapDispatchToProps: DispatchProps = {
  onClick: toggleMobileMenu
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ButtonMobile)
