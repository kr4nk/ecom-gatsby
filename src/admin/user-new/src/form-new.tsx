import * as React from 'react'
import classnames from 'classnames'

import SelectType from '../select-type'
import InputFirstName from '../input-first-name'
import InputLastName from '../input-last-name'
import InputEmail from '../input-email'
import InputPhone from '../input-phone'
import ButtonCreate from '../button-create'

import * as layout from '../../../styles/layout.module.css'
import * as grid from '../../../styles/grid.module.css'
import * as fields from '../../../styles/fields.module.css'
import * as utility from '../../../styles/utility.module.css'

interface OwnProps {
  onSubmit: React.FormEventHandler;
}

const FormNew = ({ onSubmit }: OwnProps): JSX.Element => (
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

        <InputEmail />

        <InputPhone />

        <SelectType />

        <div
          className={
            classnames(
              fields.field,
              grid.colMd4,
              utility.mt8
            )
          }
        >
          <ButtonCreate />
        </div>
      </div>
    </section>
  </form>
)

export default FormNew
