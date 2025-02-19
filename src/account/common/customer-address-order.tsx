import * as React from 'react'
import classnames from 'classnames'

import * as fields from '../../styles/fields.module.css'
import * as grid from '../../styles/grid.module.css'

import { TUser } from '../../types/account'

import {
  ADDRESS_LINE_1,
  ADDRESS_LINE_2,
  CITY,
  COUNTRY,
  STATE,
  ZIP
} from '../../redux/selector-consts'

interface OwnProps {
  customer: TUser;
}

const CustomerAddressOrder = ({ customer }: OwnProps): JSX.Element => (
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
      Address line 1

      <div className={fields.text}>
        { customer.get(ADDRESS_LINE_1) }
      </div>
    </div>

    <div
      className={
        classnames(
          fields.field,
          grid.colMd2
        )
      }
    >
      Address line 2

      <div className={fields.text}>
        { customer.get(ADDRESS_LINE_2) || '—' }
      </div>
    </div>

    <div
      className={
        classnames(
          fields.field,
          grid.colMd1
        )
      }
    >
      City

      <div className={fields.text}>
        { customer.get(CITY) }
      </div>
    </div>

    <div
      className={
        classnames(
          fields.field,
          grid.colMd1
        )
      }
    >
      Country

      <div className={fields.text}>
        { customer.get(COUNTRY) }
      </div>
    </div>

    <div
      className={
        classnames(
          fields.field,
          grid.colMd1
        )
      }
    >
      State

      <div className={fields.text}>
        { customer.get(STATE) }
      </div>
    </div>

    <div
      className={
        classnames(
          fields.field,
          grid.colMd1
        )
      }
    >
      Zip code

      <div className={fields.text}>
        { customer.get(ZIP) }
      </div>
    </div>
  </div>
)

export default CustomerAddressOrder
