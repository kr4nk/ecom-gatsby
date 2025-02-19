import * as React from 'react'
import classnames from 'classnames'

import { isBrowser } from '../utils/isbrowser'

import * as modal from '../styles/modal.module.css'

interface OwnProps {
  id: string;
  children: React.ReactNode;
  onOpen? (): void;
  onClose (): void | React.MouseEventHandler;
  onKeyUp: React.KeyboardEventHandler;
}

export interface ModalWindowActions {
  onClose(): void;
}

function ModalWindow (props: OwnProps, ref: React.Ref<ModalWindowActions>): JSX.Element {
  const [ mounted, setMounted ] = React.useState(false)

  const { onOpen } = props

  React.useEffect(
    function onMount (): () => void {
      if (isBrowser) {
        setMounted(true)

        if (onOpen instanceof Function) {
          onOpen()
        }

        return function onUnmount (): void {
          setMounted(false)
        }
      }

      return (): void => {}
    }, [ onOpen ]
  )

  const onClose = React.useCallback(
    function onClose (): void {
      setMounted(false)

      window.setTimeout(props.onClose, 200)
    }, [ props.onClose ]
  )

  React.useEffect(
    function onRefChange (): void {
      if (ref) {
        (ref as React.MutableRefObject<ModalWindowActions>).current = {
          onClose
        }
      }
    }, [ onClose, ref ]
  )

  const onOverlayClick = React.useCallback<React.MouseEventHandler>(
    function onOverlayClick (event): void {
      event.stopPropagation()

      if (event.target === event.currentTarget) {
        onClose()
      }
    }, [ onClose ]
  )

  const divRef = React.useRef<HTMLDivElement>(null)

  const onBlur = React.useCallback<React.FocusEventHandler>(
    function onBlur (event): void {
      if (
        divRef.current !== null &&
        !divRef.current.contains(event.relatedTarget as Element)
      ) {
        event.stopPropagation()
        event.preventDefault()

        if (event.target instanceof HTMLElement) {
          event.target.focus()
        }
      }
    }, []
  )

  return (
    <div
      ref={divRef}
      role='button'
      tabIndex={-1}
      className={
        classnames(
          modal.modalOverlay, {
            [modal.modalOverlayAnimate]: mounted
          }
        )
      }
      onClick={onOverlayClick}
      onKeyUp={props.onKeyUp}
      onBlur={onBlur}
    >
      <div
        id={props.id}
        role='dialog'
        className={modal.modalWindow}
        aria-labelledby={`${props.id}-dialog-title`}
        aria-modal
      >
        <header>
          <button
            tabIndex={-1}
            aria-label='Close'
            className={modal.modalClose}
            onClick={onClose}
            type='button'
          >
            <span
              aria-hidden
              className={modal.modalCloseSymbol}
            >
              &times;
            </span>
          </button>
        </header>

        { props.children }
      </div>
    </div>
  )
}

export default React.forwardRef<ModalWindowActions, OwnProps>(ModalWindow)
