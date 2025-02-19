import * as React from 'react'
import classnames from 'classnames'

import ButtonClearOrders from '../button-clear-orders'
import ButtonClearDatabase from '../button-clear-database'
import ButtonFillDatabase from '../button-fill-database'

import * as layout from '../../../styles/layout.module.css'
import * as grid from '../../../styles/grid.module.css'
import * as fields from '../../../styles/fields.module.css'

const ActionsDanger = (): JSX.Element => (
  <div className={layout.section}>
    <h2 className={layout.sectionTitle}>
      Danger Actions
    </h2>

    <div
      className={
        classnames(
          fields.fieldSet,
          grid.row
        )
      }
    >
      <div
        className={
          classnames(
            fields.field,
            grid.colMd2
          )
        }
      >
        <ButtonClearOrders />
      </div>

      <div
        className={
          classnames(
            fields.field,
            grid.colMd2
          )
        }
      >
        <ButtonFillDatabase />
      </div>

      <div
        className={
          classnames(
            fields.field,
            grid.colMd2
          )
        }
      >
        <ButtonClearDatabase />
      </div>
    </div>
  </div>
)

export default ActionsDanger
