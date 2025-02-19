import * as React from 'react'
import { Link } from 'gatsby'

import * as header from '../../styles/header.module.css'

const ButtonSignin = (): JSX.Element => (
  <Link
    title='Go To Sign In'
    to='/signin'
    className={header.buttonSignHeader}
  >
    Sign In
  </Link>
)

export default ButtonSignin
