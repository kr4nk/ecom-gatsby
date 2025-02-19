import * as React from 'react'

import { isBrowser } from '../../utils/isbrowser'

const thinWidth = 768

export default function useWide (): boolean {
  const [ wide, setWide ] = React.useState(
    function initWide (): boolean {
      return isBrowser
        ? window.innerWidth >= thinWidth
        : false
    }
  )

  const onResize = React.useCallback(
    function onResize (e: UIEvent): void {
      const target = e.target as Window
      setWide(target.innerWidth >= thinWidth)
    }, []
  )

  React.useEffect(
    function addListener (): () => void {
      if (isBrowser) {
        window.addEventListener('resize', onResize)

        return function removeListener (): void {
          window.removeEventListener('resize', onResize)
        }
      }

      return (): void => {}
    }, [ onResize ]
  )

  React.useEffect(
    function onMount (): void {
      if (isBrowser) {
        window.dispatchEvent(new Event('resize'))
      }
    }, []
  )

  return wide
}
