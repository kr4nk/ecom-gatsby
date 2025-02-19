import * as React from 'react'
import classnames from 'classnames'

import * as userCart from '../../styles/user-cart.module.css'
import * as utility from '../../styles/utility.module.css'

interface OwnProps {
  step: number;
}

const Steps = ({ step }: OwnProps): JSX.Element => (
  <div className={userCart.steps}>
    <ul
      className={
        classnames(
          userCart.stepsList,
          utility.df,
          utility.jcsa,
          utility.lsn
        )
      }
    >
      <li className={
        classnames(
          userCart.stepsItem,
          utility.roboto,
          utility.pr,
          utility.tac,
          utility.full, {
            [userCart.stepCurrent]: step >= 1
          }
        )
      }>
        <div className={
          classnames(
            userCart.stepsItemMarker,
            utility.pr,
            utility.ma,
            utility.zi2, {
              [userCart.active]: step >= 1
            }
          )
        } />

        <div className={userCart.stepsItemTitle}>
          Your Cart
        </div>
      </li>

      <li className={
        classnames(
          userCart.stepsItem,
          utility.roboto,
          utility.pr,
          utility.tac,
          utility.full, {
            [userCart.stepCurrent]: step >= 2
          }
        )
      }>
        <div className={
          classnames(
            userCart.stepsItemMarker,
            utility.pr,
            utility.ma,
            utility.zi2, {
              [userCart.active]: step >= 2
            }
          )
        } />

        <div className={userCart.stepsItemTitle}>
          Shipping
        </div>
      </li>

      <li className={
        classnames(
          userCart.stepsItem,
          utility.roboto,
          utility.pr,
          utility.tac,
          utility.full, {
            [userCart.stepCurrent]: step >= 3
          }
        )
      }>
        <div className={
          classnames(
            userCart.stepsItemMarker,
            utility.pr,
            utility.ma,
            utility.zi2, {
              [userCart.active]: step >= 3
            }
          )
        } />

        <div className={userCart.stepsItemTitle}>
          Review
        </div>
      </li>
    </ul>
  </div>
)

export default Steps
