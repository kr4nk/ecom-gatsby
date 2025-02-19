import * as React from 'react'
import classnames from 'classnames'

import PaymentWireForm from './payment-wire-form'

import * as radio from '../../styles/radio.module.css'
import * as utility from '../../styles/utility.module.css'

interface StateProps {
  selected: boolean;
}

interface DispatchProps {
  onClick: React.MouseEventHandler;
}

const PaymentWire = ({ selected, onClick }: StateProps & DispatchProps): JSX.Element => (
  <li className={radio.radioListItem}>
    <button
      className={
        classnames(
          radio.radioButton,
          utility.tal
        )
      }
      onClick={onClick}
      type='button'
    >
      <div
        className={
          classnames(
            utility.df,
            utility.aic
          )
        }
      >
        <div
          className={
            classnames(
              radio.radioBullet,
              utility.pen
            )
          }
        >
          <div
            className={
              classnames(
                radio.radioMarker, {
                  [radio.radioMarkerSelected]: selected
                }
              )
            }
          />
        </div>

        <div
          className={
            classnames(
              radio.radioListItemTitle, {
                [utility.bold]: selected
              }
            )
          }
        >
          Wire Transfer
        </div>
      </div>
    </button>

    {
      selected && (
        <div className={radio.radioListItemDetails}>
          <PaymentWireForm />
        </div>
      )
    }
  </li>
)

export default PaymentWire
