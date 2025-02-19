import * as React from 'react'
import classnames from 'classnames'

import ButtonRebuildSite from '../button-rebuild-site'
import ButtonFillWarehouses from '../button-fill-warehouses'

import * as layout from '../../../styles/layout.module.css'
import * as grid from '../../../styles/grid.module.css'
import * as fields from '../../../styles/fields.module.css'

const ActionsSafe = (): JSX.Element => (
  <div className={layout.section}>
    <h2 className={layout.sectionTitle}>
      Safe Actions
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
        <ButtonRebuildSite />
      </div>

      <div
        className={
          classnames(
            fields.field,
            grid.colMd2
          )
        }
      >
        <ButtonFillWarehouses />
      </div>
    </div>
  </div>
)

export default ActionsSafe
