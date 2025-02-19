import * as React from 'react'
import * as classnames from 'classnames'

import * as landing from '../../styles/landing.module.css'
import * as utility from '../../styles/utility.module.css'

export default function About (): JSX.Element {
  return (
    <div className={landing.about}>
      <div className={landing.section}>
        <p className={landing.aboutP}>
         text
        </p>

        <h3
          className={
            classnames(
              landing.aboutH3,
              utility.tac
            )
          }
        >
          To speak with a specialist call

          <br />

          <span className={landing.aboutSpan}>000</span>
        </h3>

        <br />

        <div className={landing.emailLinkBox}>
          <i className={landing.italic}>or email&nbsp;</i> <a className={landing.emailLink} href='mailto&#58;'>ecom</a>
        </div>
      </div>
    </div>
  )
}
