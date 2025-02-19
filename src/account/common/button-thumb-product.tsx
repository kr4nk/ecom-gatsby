import * as React from 'react'
import classnames from 'classnames'

import LazyImage from '../../utils/lazyimage'
import { observer } from '../../utils/observer'

import * as product from '../../styles/product.module.css'

import { BreakPoint, TImmutableBreakpoints } from '../../types/common'

interface OwnProps {
  index: number;
  selected: boolean;
  breakpoints: TImmutableBreakpoints;
  onClick(index: number): void;
}

function ButtonThumbProduct (props: OwnProps): JSX.Element {
  const breakpoints = React.useMemo(
    function setBreakpoints (): BreakPoint[] {
      return props.breakpoints.toJS()
    }, [ props.breakpoints ]
  )

  const onClick = React.useCallback<React.MouseEventHandler>(
    function onClick (): void {
      props.onClick(props.index)
    }, [ props ]
  )

  const index = props.index + 1

  return (
    <button
      aria-label={`Image #${index} of the product`}
      className={
        classnames(
          product.productThumb,
          product.image, {
            [product.productThumbSelected]: props.selected
          }
        )
      }
      onClick={onClick}
      type='button'
    >
      <LazyImage
        observer={observer}
        breakpoints={breakpoints}
        title={`Image #${index} of the product`}
        alt={`Image #${index} of the product`}
      />
    </button>
  )
}

export default React.memo(ButtonThumbProduct)
