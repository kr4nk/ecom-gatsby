import * as React from 'react'
import classnames from 'classnames'

import { COUNTRY_US } from '../../const/countries'

import InputAddressLine1 from '../profile/input-address-line-1'
import InputAddressLine2 from '../profile/input-address-line-2'
import InputCity from '../profile/input-city'
import InputZip from '../profile/input-zip'
import SelectCountry from '../profile/select-country'
import ComboboxStateCanada from '../profile/combobox-state-canada'
import ComboboxStateUs from '../profile/combobox-state-us'

import * as layout from '../../styles/layout.module.css'
import * as grid from '../../styles/grid.module.css'
import * as fields from '../../styles/fields.module.css'
import * as buttons from '../../styles/buttons.module.css'

import { TImmutableInput } from '../../types/common'
import { TUserData } from '../../types/user'

import {
  VALUE,
  ADDRESS_LINE_1,
  ADDRESS_LINE_2,
  CITY,
  COUNTRY,
  STATE,
  ZIP
} from '../../redux/selector-consts'

interface StateProps {
  isEdited: TImmutableInput;
  isFetching: boolean;
  country: string;
  user: TUserData;
}

interface DispatchProps {
  saveBillingAddress: React.MouseEventHandler;
  editBillingAddress: React.MouseEventHandler;
}

const BillingProfile = (props: StateProps & DispatchProps): JSX.Element => (
  <section className={layout.section}>
    <h2 className={layout.sectionTitle}>
      Billing address
    </h2>

    {
      props.isEdited.get(VALUE)
        ? (
          <div
            className={
              classnames(
                fields.fieldSet,
                grid.row
              )
            }
          >
            <InputAddressLine1 />

            <InputAddressLine2 />

            <InputCity />

            <SelectCountry />

            {
              props.country === COUNTRY_US
                ? (<ComboboxStateUs />)
                : (<ComboboxStateCanada />)
            }

            <InputZip />
          </div>
        )
        : (
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
                { props.user.get(ADDRESS_LINE_1) }
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
                { props.user.get(ADDRESS_LINE_2) }
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
                { props.user.get(CITY) }
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
                { props.user.get(COUNTRY) }
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
                { props.user.get(STATE) }
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
                { props.user.get(ZIP) }
              </div>
            </div>
          </div>
        )
    }

    {
      // eslint-disable-next-line @getify/proper-arrows/return
      props.isEdited.get(VALUE)
        ? (
          <button
            className={
              classnames(
                buttons.button,
                buttons.buttonPrimary
              )
            }
            onClick={props.saveBillingAddress}
            disabled={props.isFetching}
            type='button'
          >
            Save
          </button>
        )
        : (
          <button
            className={
              classnames(
                buttons.button,
                buttons.buttonPrimary
              )
            }
            disabled={props.isFetching}
            onClick={props.editBillingAddress}
            type='button'
          >
            Edit
          </button>
        )
    }
  </section>
)

export default BillingProfile
