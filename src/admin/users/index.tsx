import * as React from 'react'

import ControlsUsers from './controls'
import UserList from './users'

import * as layout from '../../styles/layout.module.css'

const AdminUsers = (): JSX.Element => (
  <div className={layout.container}>
    <ControlsUsers />

    <div className={layout.content}>
      <h1 className={layout.pageTitle}>
        Users
      </h1>

      <UserList />
    </div>

    <ControlsUsers />
  </div>
)

export default AdminUsers
