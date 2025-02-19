import * as React from 'react'

import FormEdit from './form-edit'

import * as layout from '../../styles/layout.module.css'

const UserEdit = (): JSX.Element => (
  <div className={layout.container}>
    <div className={layout.content}>
      <h1 className={layout.pageTitle} >
        Edit User
      </h1>

      <FormEdit />
    </div>
  </div>
)

export default UserEdit
