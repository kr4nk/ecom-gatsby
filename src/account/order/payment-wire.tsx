import * as React from 'react'
import classnames from 'classnames'
import { connect } from 'react-redux'

import { selectCombobox } from '../../redux/actions/fields'

import PaymentWireForm from '../common/payment-wire-form'

import * as radio from '../../styles/radio.module.css'
import * as utility from '../../styles/utility.module.css'

import { Dispatch, TImmutableInput } from '../../types/common'

import { PATH } from '../../redux/selector-consts'

interface DispatchProps {
  onClick: React.MouseEventHandler;
}

interface OwnProps {
  params: TImmutableInput;
  selected: boolean;
  type: string;
}

const PaymentWire = ({ selected, onClick }: DispatchProps & OwnProps): JSX.Element => (
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

const mapDispatchToProps = (dispatch: Dispatch, { params, type }: OwnProps): DispatchProps => ({
  onClick (): void {
    dispatch(
      selectCombobox({
        path: params.get(PATH),
        value: type
      })
    )
  }
})

export default connect(
  null,
  mapDispatchToProps
)(PaymentWire)
