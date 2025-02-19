import * as React from 'react'
import classnames from 'classnames'

import * as carousel from '../../styles/carousel.module.css'

interface OwnProps {
  active: boolean;
  focus: boolean;
  index: number;
  label: string;

  onKeyDown: React.KeyboardEventHandler;
  onClick(index: number): void;
}

// eslint-disable-next-line perf-standard/check-function-inline
function ButtonIndicator (props: OwnProps): JSX.Element {
  const ref = React.useRef<HTMLButtonElement>(null)

  React.useEffect(
    function onActivate (): void {
      if (props.focus && props.active && ref.current !== null) {
        ref.current.focus()
      }
    }, [ props.focus, props.active ]
  )

  const onClick = React.useCallback<React.MouseEventHandler>(
    function onClick (event): void {
      event.stopPropagation()

      props.onClick(props.index)
    }, [ props ]
  )

  return (
    <button
      ref={ref}
      role='radio'
      type='button'
      tabIndex={props.active ? 0 : -1}
      aria-label={props.label}
      aria-checked={props.active}
      className={
        classnames(
          carousel.indicator, {
            [carousel.indicatorActive]: props.active
          }
        )
      }
      onKeyDown={props.onKeyDown}
      onClick={onClick}
    />
  )
}

export default React.memo(ButtonIndicator)
