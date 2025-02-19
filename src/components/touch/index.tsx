import * as React from 'react'

interface OwnProps {
  children: React.ReactNode;
  className: string;
  tapTolerance: number;
  swipeTolerance: number;
  onTap: React.TouchEventHandler;
  onSwipe(event: React.TouchEvent<HTMLDivElement>, direction: string): void;
}

function touchX (event: React.TouchEvent<HTMLDivElement>): number { return event.touches[0].clientX }
function touchY (event: React.TouchEvent<HTMLDivElement>): number { return event.touches[0].clientY }

interface TouchObj {
  swipeOutBounded: boolean;
  touchStarted: boolean;
  touchMoved: boolean;

  startX: number;
  startY: number;

  currentX: number;
  currentY: number;
}

export default function Touch (props: OwnProps): JSX.Element {
  const ref = React.useRef<TouchObj>({
    swipeOutBounded: false,
    touchStarted: false,
    touchMoved: false,
    startX: 0,
    startY: 0,
    currentX: 0,
    currentY: 0
  })

  const handleTouchStart = React.useCallback<React.TouchEventHandler<HTMLDivElement>>(
    function handleTouchStart (event): void {
      if (ref.current.touchStarted) {
        return
      }

      ref.current.touchStarted = true

      ref.current.touchMoved = false
      ref.current.swipeOutBounded = false

      ref.current.startX = touchX(event)
      ref.current.startY = touchY(event)

      ref.current.currentX = 0
      ref.current.currentY = 0
    }, []
  )

  const handleTouchMove = React.useCallback<React.TouchEventHandler<HTMLDivElement>>(
    function handleTouchMove (event): void {
      ref.current.currentX = touchX(event)
      ref.current.currentY = touchY(event)

      if (!ref.current.touchMoved) {
        ref.current.touchMoved = (
          Math.abs(ref.current.startX - ref.current.currentX) > props.tapTolerance ||
          Math.abs(ref.current.startY - ref.current.currentY) > props.tapTolerance
        )
      } else if (!ref.current.swipeOutBounded) {
        const swipeOutBounded = props.swipeTolerance

        ref.current.swipeOutBounded = (
          Math.abs(ref.current.startX - ref.current.currentX) > swipeOutBounded &&
          Math.abs(ref.current.startY - ref.current.currentY) > swipeOutBounded
        )
      }
    }, [ props.tapTolerance, props.swipeTolerance ]
  )

  const handleTouchCancel = React.useCallback<React.TouchEventHandler<HTMLDivElement>>(
    function handleTouchCancel (): void {
      ref.current.touchStarted = ref.current.touchMoved = false
      ref.current.startX = ref.current.startY = 0
    }, []
  )

  const handleTouchEnd = React.useCallback<React.TouchEventHandler<HTMLDivElement>>(
    function handleTouchEnd (event): void {
      ref.current.touchStarted = false

      if (!ref.current.touchMoved) {
        if (props.onTap) {
          props.onTap(event)
        }
      } else if (!ref.current.swipeOutBounded) {
        if (props.onSwipe) {
          const direction =
            (Math.abs(ref.current.startX - ref.current.currentX) < props.swipeTolerance)
              ? (
                ref.current.startY > ref.current.currentY
                  ? 'top'
                  : 'bottom'
              )
              : (
                ref.current.startX > ref.current.currentX
                  ? 'left'
                  : 'right'
              )

          props.onSwipe(event, direction)
        }
      }
    }, [ props ]
  )

  return (
    <div
      className={props.className}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchCancel={handleTouchCancel}
      onTouchEnd={handleTouchEnd}
    >
      {
        props.children
      }
    </div>
  )
}

Touch.defaultProps = {
  tapTolerance: 10,
  swipeTolerance: 30,
  className: '',
  onTap (): void {},
  onSwipe (): void {}
}
