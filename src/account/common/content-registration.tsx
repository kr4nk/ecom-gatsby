import * as React from 'react'
import classnames from 'classnames'

import { COUNTRY_US } from '../../const/countries'

import SelectCountry from '../registration/select-country'
import ComboboxStateUs from '../registration/combobox-state-us'
import ComboboxStateCanada from '../registration/combobox-state-canada'
import InputFirstName from '../registration/input-first-name'
import InputLastName from '../registration/input-last-name'
import InputPhone from '../registration/input-phone'
import InputBusinessName from '../registration/input-business-name'
import InputBusinessPhone from '../registration/input-business-phone'
import InputAddressLine1 from '../registration/input-address-line-1'
import InputAddressLine2 from '../registration/input-address-line-2'
import InputCity from '../registration/input-city'
import InputZip from '../registration/input-zip'
import ErrorMessage from '../registration/error-message-registration'
import ButtonRegister from '../registration/button-register'

import * as layout from '../../styles/layout.module.css'
import * as grid from '../../styles/grid.module.css'
import * as fields from '../../styles/fields.module.css'

interface OwnProps {
  onSubmit: React.FormEventHandler;
  country: string;
}

const ContentRegistration = ({ country, onSubmit }: OwnProps): JSX.Element => (
  <form onSubmit={onSubmit}>
    <section className={layout.section}>
      <h2 className={layout.sectionTitle}>
        Personal information
      </h2>

      <div
        className={
          classnames(
            fields.fieldSet,
            grid.row
          )
        }
      >
        <InputFirstName />

        <InputLastName />

        <InputPhone />
      </div>
    </section>

    <section className={layout.section}>
      <h2 className={layout.sectionTitle}>
        Business information
      </h2>

      <div
        className={
          classnames(
            fields.fieldSet,
            grid.row
          )
        }
      >
        <InputBusinessName />

        <InputBusinessPhone />
      </div>
    </section>

    <section className={layout.section}>
      <h2 className={layout.sectionTitle}>
        Address
      </h2>

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
          // eslint-disable-next-line @getify/proper-arrows/return
          country === COUNTRY_US
            ? <ComboboxStateUs />
            : <ComboboxStateCanada />
        }

        <InputZip />
      </div>
    </section>

    <ErrorMessage />

    <section className={layout.section}>
      <ButtonRegister />
    </section>
  </form>
)

export default ContentRegistration
