import * as React from 'react'
import classnames from 'classnames'

import PermitUpload from '../profile/permit-upload'
import TaxExemptionFormUpload from '../profile/tax-exemption-form-upload'

import SvgInfo from '../../components/svg/info'

import * as fields from '../../styles/fields.module.css'
import * as layout from '../../styles/layout.module.css'
import * as utility from '../../styles/utility.module.css'

const Pending = (): JSX.Element => (
  <div className={layout.container}>
    <div className={layout.content}>
      <h1 className={layout.pageTitle}>
        Thank You!
      </h1>

      <section className={layout.section}>
        <h2 className={layout.textTitle}>
          We are verifying your application. Please let us know if you have any questions:
        </h2>

        <div className={layout.text}>
          <p className={layout.paragraph}>
            Phone:&nbsp;

            <a
              href='tel:0000'
              title='call to ecom-gatsby office'
            >
              (000)&nbsp;000
            </a>
          </p>

          <p className={layout.paragraph}>
            Email:&nbsp;

            <a
              href='mailto:info@ecom-gatsby.com'
              title='send a message to our office'
            >
              info@ecom-gatsby.com
            </a>
          </p>
        </div>
      </section>

      <section className={layout.section}>
        <PermitUpload />
      </section>

      <section className={layout.section}>
        <TaxExemptionFormUpload />
      </section>

      <section className={layout.section}>
        <div
          className={
            classnames(
              fields.alert,
              fields.alertInfo,
              utility.df,
              utility.aic
            )
          }
        >
          <div
            role='img'
            aria-hidden
            className={fields.iconAlert}
          >
            <SvgInfo />
          </div>

          <p>
            {"You can upload your Reseller's Permit or Tax Exemption form on your profile page later on."}
          </p>
        </div>
      </section>
    </div>
  </div>
)

export default Pending
