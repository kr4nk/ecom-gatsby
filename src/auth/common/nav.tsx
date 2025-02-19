import classnames from 'classnames'
import { Link } from 'gatsby'
import * as React from 'react'

import * as buttons from '../../styles/buttons.module.css'
import * as utility from '../../styles/utility.module.css'

const Nav = (): JSX.Element => {
  const getLinkProps = React.useCallback(
    function useCallback ({ isPartiallyCurrent }: { isPartiallyCurrent: boolean }): { className: string } {
      return ({
        className: isPartiallyCurrent
          ? classnames(
            buttons.button,
            buttons.buttonSignNav,
            utility.tac,
            utility.bold,
            buttons.buttonSignNavActive
          )
          : classnames(
            buttons.button,
            buttons.buttonSignNav,
            utility.tac,
            utility.bold
          )
      })
    }, []
  )

  return (
    <div
      className={
        classnames(
          utility.df,
          utility.fdr
        )
      }
    >
      <Link
        title='Sign In'
        to='/signin'
        getProps={getLinkProps}
      >
        Sign In
      </Link>

      <Link
        title='Sign Up'
        to='/signup'
        getProps={getLinkProps}
      >
        Sign Up
      </Link>
    </div>
  )
}

export default Nav
