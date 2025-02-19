import * as React from 'react'
import { Link } from 'gatsby'
import classnames from 'classnames'

import Svg404 from '../../components/svg/404'

import * as notfound from '../../styles/notfound.module.css'
import * as buttons from '../../styles/buttons.module.css'
import * as utility from '../../styles/utility.module.css'

const Notfound = (): JSX.Element => (
  <section
    className={
      classnames(
        notfound.content,
        utility.tac
      )
    }
  >
    <div
      role='img'
      aria-label='Error 404'
      className={notfound.svg404}
    >
      <Svg404 />
    </div>

    <h1
      className={
        classnames(
          notfound.heading,
          utility.bold,
          utility.full
        )
      }
    >
      Page not found
    </h1>

    <p className={notfound.paragraph}>
      Sorry, the page you’re looking for doesn’t exist.
    </p>

    <p className={notfound.paragraph}>
      You can visit our home page or press the Return button in your browser to go to the previous page.
    </p>

    <Link
      className={
        classnames(
          buttons.button,
          notfound.buttonNotFound,
          utility.roboto,
          utility.ttu
        )
      }
      to='/'
    >
      Go To Home
    </Link>
  </section>
)

export default Notfound
