import * as React from 'react'
import { Router } from '@reach/router'

import Universal from '../utils/universal'

function Admin (): JSX.Element {
  return (
    <Router>
      <Universal
        page='dynamic/logout'
        path='/admin/logout'
      />

      <Universal
        page='admin/dashboard'
        path='/admin'
      />

      <Universal
        page='admin/tools'
        path='/admin/tools'
      />

      <Universal
        page='admin/users'
        path='/admin/users'
      />

      <Universal
        page='admin/user-new'
        path='/admin/user/new'
      />

      <Universal
        page='admin/user-edit'
        path='/admin/user/:userId'
      />

      <Universal
        page='admin/warehouse-new'
        path='/admin/warehouse/new'
      />

      <Universal
        page='admin/warehouse-edit'
        path='/admin/warehouse/:warehouseId'
      />

      <Universal
        page='admin/warehouses'
        path='/admin/warehouses'
      />
    </Router>
  )
}

export default React.memo(Admin)
