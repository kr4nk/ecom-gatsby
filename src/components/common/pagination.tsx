import * as React from 'react'
import classnames from 'classnames'

import SvgAngleDoubleLeft from '../svg/angle-double-left'
import SvgAngleDoubleRight from '../svg/angle-double-right'
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
  total: number;
  pageSize: number;
  disabled: boolean;

  toBegin: React.MouseEventHandler;
  toEnd: React.MouseEventHandler;
  goBack: React.MouseEventHandler;
  goNext: React.MouseEventHandler;
}

interface DefaultProps {
  position: TVerticalPosition;
}

function Pagination ({
  position,
  past,
  total,
  pageSize,
  disabled,
  toBegin,
  toEnd,
  goBack,
  goNext
}: OwnProps & DefaultProps): JSX.Element {
  return (
    <div
      className={
        classnames(
          pagination.pagination,
          positionClasses[position]
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
                  [pagination.disabled]: disabled || past === 0
                }
              )
            }
            disabled={disabled || past === 0}
            onClick={toBegin}
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
                  [pagination.disabled]: disabled || past === 0
                }
              )
            }
            disabled={disabled || past === 0}
            onClick={goBack}
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
          { past + 1 } - { (past + pageSize) > total ? total : (past + pageSize) } of { total }
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
                  [pagination.disabled]: disabled || past + pageSize >= total
                }
              )
            }
            disabled={disabled || past + pageSize >= total}
            onClick={goNext}
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

          <button
            aria-label='Last page'
            className={
              classnames(
                pagination.angle, {
                  [pagination.disabled]: disabled || (past + pageSize) >= total
                }
              )
            }
            disabled={disabled || (past + pageSize) >= total}
            onClick={toEnd}
            type='button'
          >
            <div
              role='img'
              aria-hidden
              className={pagination.icon}
            >
              <SvgAngleDoubleRight />
            </div>
          </button>
        </div>
      </div>
    </div>
  )
}

Pagination.defaultProps = {
  position: 'bottom'
}

export default React.memo(Pagination)
