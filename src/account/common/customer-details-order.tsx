import * as React from 'react'
import classnames from 'classnames'

import * as grid from '../../styles/grid.module.css'
import * as fields from '../../styles/fields.module.css'
import * as utility from '../../styles/utility.module.css'

import { TUser } from '../../types/account'

import {
  FIRST_NAME,
  LAST_NAME,
  BUSINESS_NAME,
  PHONE,
  BUSINESS_PHONE,
  EMAIL
} from '../../redux/selector-consts'

interface OwnProps {
  customer: TUser;
}

const CustomerDetailsOrder = ({ customer }: OwnProps): JSX.Element => (
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
      Full name

      <span
        className={
          classnames(
            fields.text,
            utility.db
          )
        }
      >
        { customer.get(FIRST_NAME) } { customer.get(LAST_NAME) }
      </span>
    </div>

    <div
      className={
        classnames(
          fields.field,
          grid.colMd2
        )
      }
    >
      Business name

      <span
        className={
          classnames(
            fields.text,
            utility.db
          )
        }
      >
        { customer.get(BUSINESS_NAME) }
      </span>
    </div>

    <div
      className={
        classnames(
          fields.field,
          grid.colMd2
        )
      }
    >
      Personal phone

      <a
        className={
          classnames(
            fields.text,
            utility.db
          )
        }
        href={
          // eslint-disable-next-line @getify/proper-arrows/return
          customer.get(PHONE)
            ? `tel:${customer.get(PHONE)}`
            : undefined
        }
      >
        { customer.get(PHONE) || '—' }
      </a>
    </div>

    <div
      className={
        classnames(
          fields.field,
          grid.colMd2
        )
      }
    >
      Business phone

      <a
        className={
          classnames(
            fields.text,
            utility.db
          )
        }
        href={`tel:${customer.get(BUSINESS_PHONE)}`}
      >
        { customer.get(BUSINESS_PHONE) }
      </a>
    </div>

    <div
      className={
        classnames(
          fields.field,
          grid.colMd2
        )
      }
    >
      Email

      <a
        className={
          classnames(
            fields.text,
            utility.db
          )
        }
        href={`mailto:${customer.get(EMAIL)}`}
      >
        { customer.get(EMAIL) }
      </a>
    </div>
  </div>
)

export default CustomerDetailsOrder
