import * as React from 'react'
import classnames from 'classnames'

import * as footer from '../styles/footer.module.css'
import * as utility from '../styles/utility.module.css'

const Footer = (): JSX.Element => (
  <footer
    className={
      classnames(
        utility.full,
        utility.df,
        utility.fdc
      )
    }
  >
    <div
      className={
        classnames(
          footer.content,
          utility.df,
          utility.tac,
          utility.pea,
          utility.ust
        )
      }
    >
      <p>
      addrees
      </p>

      <p>
        <a
          href='mailto:info@ecom-gatsby.com'
          title='email'
        >
          info@ecom-gatsby.com
        </a>
      </p>

      <p>
        <a
          title={`Phone number 000`}
          href='tel:+000'
        >
          (000)&nbsp;000
        </a>
      </p>
    </div>
  </footer>
)

export default React.memo(Footer)
