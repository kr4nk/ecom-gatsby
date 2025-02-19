import * as React from 'react'
import classnames from 'classnames'

import * as product from '../../styles/product.module.css'
import * as utility from '../../styles/utility.module.css'

interface OwnProps {
  id: string;
  title: string;
  selected: boolean;
  onKeyDown: React.KeyboardEventHandler;
  onClick(id: string): void;
}

export default function ButtonTab (props: OwnProps): JSX.Element {
  const tabRef = React.useRef<HTMLButtonElement>(null)

  const [ , setSelected ] = React.useState(props.selected)

  React.useEffect(
    function focusEffect (): void {
      setSelected(function setSelected (selected): boolean {
        if (selected !== props.selected) {
          if (props.selected && tabRef.current !== null) {
            tabRef.current.focus()
          }
        }

        return props.selected
      })
    },
    [ props.selected ]
  )

  const onClick = React.useCallback<React.ReactEventHandler>(
    function onClick (): void {
      props.onClick(props.id)
    }, [ props ]
  )

  return (
    <button
      id={props.id}
      ref={tabRef}
      role='tab'
      aria-selected={props.selected}
      aria-controls={`${props.id}-tab`}
      tabIndex={props.selected ? 0 : -1}
      className={
        classnames(
          product.productTab,
          utility.roboto,
          utility.bold, {
            [product.selectedTab]: props.selected
          }
        )
      }
      onKeyDown={props.onKeyDown}
      onClick={onClick}
      type='button'
    >
      { props.title }
    </button>
  )
}
