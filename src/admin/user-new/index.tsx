import * as React from 'react'

import FormNew from './form-new'

import * as layout from '../../styles/layout.module.css'

const UserNew = (): JSX.Element => (
  <div className={layout.container}>
    <div className={layout.content}>
      <h1 className={layout.pageTitle} >
        Add New User
      </h1>

      <FormNew />
    </div>
  </div>
)

export default UserNew
