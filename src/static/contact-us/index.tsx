import * as React from 'react'
import classnames from 'classnames'

import InputEmail from './input-email'
import ButtonSendEmail from './button-send-email'
import CheckboxPrivacyPolicy from './checkbox-privacy-policy'
import ErrorBlock from './error-block'
import TextareaMessage from './textarea-message'

import ReCaptcha from '../../components/recaptcha'

import * as layout from '../../styles/layout.module.css'
import * as grid from '../../styles/grid.module.css'
import * as fields from '../../styles/fields.module.css'

const ContactUs = (): JSX.Element => (
  <div className={layout.container}>
    <div className={layout.content}>
      <h1 className={layout.pageTitle}>
        Contact Us
      </h1>

      <ReCaptcha
        id='contact-us-recaptcha'
        action='contact'
      />

      <section className={layout.section}>
        <div className={grid.row}>
          <InputEmail />

          <TextareaMessage />

          <div
            className={
              classnames(
                fields.field,
                grid.colMd4
              )
            }
          >
            <CheckboxPrivacyPolicy />
          </div>

          <div
            className={
              classnames(
                fields.field,
                grid.colMd1
              )
            }
          >
            <ButtonSendEmail />
          </div>
        </div>

        <ErrorBlock />
      </section>
    </div>
  </div>
)

export default ContactUs
