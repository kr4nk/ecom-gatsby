import * as React from 'react'
import classnames from 'classnames'
import { connect } from 'react-redux'

import { isBrowser } from '../../utils/isbrowser'

import { getRefundFieldOpen } from '../../redux/selectors/user-order'

import Products from '../order-refund-common/products-order-refund'
import Summary from '../order-refund-common/summary-order-refund'

import TextareaReason from './textarea-reason'
import ButtonRefundSubmit from './button-refund-submit'
import ButtonRefundCancel from './button-refund-cancel'

import * as layout from '../../styles/layout.module.css'
import * as grid from '../../styles/grid.module.css'
import * as utility from '../../styles/utility.module.css'

import {
  ReduxState,
  TImmutableCheckbox
} from '../../types/common'

import { CHECKED } from '../../redux/selector-consts'

interface StateProps {
  open: TImmutableCheckbox;
}

function OrderRefundNew (props: StateProps): JSX.Element {
  const divRef = React.useRef<HTMLDivElement>(null)

  const checked = props.open.get(CHECKED)

  const [ open, setOpen ] = React.useState(false)

  React.useEffect(
    // eslint-disable-next-line perf-standard/check-function-inline
    function onToggle (): void {
      if (isBrowser) {
        setOpen(function setOpen (open): boolean {
          if (checked !== open) {
            if (open) {
              window.setTimeout(
                function timeout (): void {
                  if (divRef.current !== null) {
                    divRef.current.scrollIntoView({
                      behavior: 'smooth',
                      block: 'start'
                    })
                  }
                }, 0
              )
            }

            return checked
          }

          return open
        })
      }
    }, [ checked ]
  )

  return (
    <div ref={divRef}>
      {
        open
          ? (
            <section
              className={
                classnames(
                  layout.section,
                  layout.secondary
                )
              }
            >
              <h2 className={layout.sectionTitle}>
                Request Refund
              </h2>

              <Products index={-1} />

              <Summary index={-1} />

              <div className={grid.row}>
                <TextareaReason />
              </div>

              <div
                className={
                  classnames(
                    utility.df,
                    utility.jcsb
                  )
                }
              >
                <ButtonRefundSubmit />

                <ButtonRefundCancel field={props.open} />
              </div>
            </section>
          )
          : (<></>)
      }
    </div>
  )
}

const mapStateToProps = (state: ReduxState): StateProps => ({
  open: getRefundFieldOpen(state)
})

export default connect(
  mapStateToProps
)(OrderRefundNew)
