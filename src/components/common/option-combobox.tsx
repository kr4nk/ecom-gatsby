import * as React from 'react'
import classnames from 'classnames'

import * as combobox from '../../styles/combobox.module.css'

interface OwnProps {
  id: string;
  index: number;
  selected: boolean;
  active: boolean;
  value: string;

  onClick (index: number): void;
  onKeyDown: React.KeyboardEventHandler;
}

function OptionCombobox (props: OwnProps): JSX.Element {
  const itemRef = React.useRef<HTMLLIElement>(null)

  React.useEffect(
    function onActivate (): void {
      if (props.active) {
        const element = itemRef.current

        if (element !== null && element.parentNode !== null) {
          const parent = element.parentNode as HTMLElement

          if (
            parent.scrollTop > element.offsetTop ||
            parent.scrollTop + parent.offsetHeight < element.offsetTop + element.offsetHeight
          ) {
            parent.scrollTop = element.offsetTop + element.offsetHeight / 2 - parent.offsetHeight / 2
          }
        }
      }
    }, [ props.active ]
  )

  const onClick = React.useCallback<React.MouseEventHandler>(
    function onClick (): void {
      props.onClick(props.index)
    }, [ props ]
  )

  return (
    <li
      role='option'
      ref={itemRef}
      id={`${props.id}-option-${props.index}`}
      aria-selected={props.selected}
      className={
        classnames(
          combobox.dropdownOption, {
            [combobox.dropdownOptionActive]: props.active
          }
        )
      }
      onClick={onClick}
      onKeyDown={props.onKeyDown}
    >
      {
        props.value
      }
    </li>
  )
}

export default React.memo(OptionCombobox)
