import * as React from 'react'
import classnames from 'classnames'

import SvgAngleDoubleLeft from '../svg/angle-double-left'
import SvgAngleLeft from '../svg/angle-left'
import SvgAngleRight from '../svg/angle-right'

import * as pagination from '../../styles/pagination.module.css'
import * as utility from '../../styles/utility.module.css'

import {
  TVerticalPosition
} from '../../types/common'

const positionClasses: {
  [key in TVerticalPosition]: string;
} = {
  top: pagination.paginationTop,
  middle: pagination.paginationCenter,
  bottom: pagination.paginationBottom,
}

interface OwnProps {
  position?: TVerticalPosition;
  past: number;
  count: number;
  total: number;
  loading: boolean;

  toBegin: React.MouseEventHandler;
  goBack: React.MouseEventHandler;
  goNext: React.MouseEventHandler;
}

interface DefaultProps {
  position: TVerticalPosition;
}

function PaginationLoadable (props: OwnProps & DefaultProps): JSX.Element {
  return (
    <div
      className={
        classnames(
          pagination.pagination,
          positionClasses[props.position]
        )
      }
    >
      <div
        className={
          classnames(
            pagination.paginationControls,
            utility.df,
            utility.jcsb,
            utility.aic
          )
        }
      >
        <div
          className={
            classnames(
              pagination.buttonGroup,
              utility.df
            )
          }
        >
          <button
            aria-label='First page'
            className={
              classnames(
                pagination.angle, {
                  [pagination.disabled]: props.loading
                }
              )
            }
            disabled={props.loading}
            onClick={props.toBegin}
            type='button'
          >
            <div
              role='img'
              aria-hidden
              className={pagination.icon}
            >
              <SvgAngleDoubleLeft />
            </div>
          </button>

          <button
            aria-label='Prev page'
            className={
              classnames(
                pagination.angle, {
                  [pagination.disabled]: props.loading
                }
              )
            }
            disabled={props.loading}
            onClick={props.goBack}
            type='button'
          >
            <div
              role='img'
              aria-hidden
              className={pagination.icon}
            >
              <SvgAngleLeft />
            </div>
          </button>
        </div>

        <div className={pagination.pagesCount}>
          { props.past + 1 } - { props.past + props.count } of ~{ props.total }
        </div>

        <div
          className={
            classnames(
              pagination.buttonGroup,
              utility.df
            )
          }
        >
          <button
            aria-label='Next page'
            className={
              classnames(
                pagination.angle, {
                  [pagination.disabled]: props.loading
                }
              )
            }
            disabled={props.loading}
            onClick={props.goNext}
            type='button'
          >
            <div
              role='img'
              aria-hidden
              className={pagination.icon}
            >
              <SvgAngleRight />
            </div>
          </button>
        </div>
      </div>
    </div>
  )
}

PaginationLoadable.defaultProps = {
  position: 'bottom'
}

export default React.memo(PaginationLoadable)
