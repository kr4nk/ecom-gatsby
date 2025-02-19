import * as React from 'react'
import { Map } from 'immutable'
import classnames from 'classnames'
import * as dayjs from 'dayjs'
import { connect } from 'react-redux'

import { getUser } from '../../redux/selectors/user'

import PermitUpload from './permit-upload'

import TaxExemptionFormUpload from './tax-exemption-form-upload'

import * as userProfile from '../../styles/user-profile.module.css'
import * as layout from '../../styles/layout.module.css'
import * as grid from '../../styles/grid.module.css'
import * as fields from '../../styles/fields.module.css'
import * as utility from '../../styles/utility.module.css'

import { ReduxState } from '../../types/common'

import { CREATED_AT, FIRST_NAME, LAST_NAME, BUSINESS_NAME, PHONE, BUSINESS_PHONE, EMAIL, ADDRESS_LINE_1, ADDRESS_LINE_2, CITY, COUNTRY, STATE, ZIP } from '../../redux/selector-consts'

interface StateProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  user: Map<string, any>;
}

const Profile = ({ user }: StateProps): JSX.Element => (
  <div className={layout.container}>
    <div className={layout.content}>
      <div className={layout.pageTitle}>
        <h1>
          Profile
        </h1>

        <time
          className={
            classnames(
              userProfile.date,
              utility.ust
            )
          }
          dateTime={
            dayjs(user.get(CREATED_AT))
              .toISOString()
          }
        >
          Created on: {
            dayjs(user.get(CREATED_AT))
              .format('LL')
          }
        </time>
      </div>

      <section className={layout.section}>
        <h2 className={layout.sectionTitle}>
          Customer
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
            Full name:

            <div className={fields.text}>
              { user.get(FIRST_NAME)} { user.get(LAST_NAME)}
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
            Business name:

            <div className={fields.text}>
              { user.get(BUSINESS_NAME) }
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
            Phone:

            <div className={fields.text}>
              { user.get(PHONE) || '—' }
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
            Business phone:

            <div className={fields.text}>
              { user.get(BUSINESS_PHONE) }
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
            Email:

            <div className={fields.text}>
              { user.get(EMAIL) }
            </div>
          </div>
        </div>
      </section>

      <section className={layout.section}>
        <h2 className={layout.sectionTitle}>
          Billing address
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
            Address line 1:

            <div className={fields.text}>
              { user.get(ADDRESS_LINE_1) }
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
            Address line 2:

            <div className={fields.text}>
              { user.get(ADDRESS_LINE_2) || '—' }
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
            City:

            <div className={fields.text}>
              { user.get(CITY) }
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
            Country:

            <div className={fields.text}>
              { user.get(COUNTRY) }
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
            State:

            <div className={fields.text}>
              { user.get(STATE) }
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
            ZIP code:

            <div className={fields.text}>
              { user.get(ZIP) }
            </div>
          </div>
        </div>
      </section>

      <section className={layout.section}>
        <PermitUpload />
      </section>

      <section className={layout.section}>
        <TaxExemptionFormUpload />
      </section>
    </div>
  </div>
)

const mapStateToProps = (state: ReduxState): StateProps => ({
  user: getUser(state)
})

export default connect(
  mapStateToProps
)(Profile)
