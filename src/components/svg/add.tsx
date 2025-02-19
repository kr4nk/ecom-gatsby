import * as React from 'react'

function SvgAdd (): JSX.Element {
  return (
    <svg viewBox='0 0 16 16'>
      <path
        fillRule='nonzero'
        d='M14,8c0,0.6,0,1-0.6,1H9v4.4C9,14,8.6,14,8,14s-1,0-1-0.6V9H2.6C2,9,2,8.6,2,8s0-1,0.6-1H7V2.6C7,2,7.4,2,8,2s1,0,1,0.6V7 h4.4C14,7,14,7.4,14,8L14,8z'
      />
    </svg>
  )
}

export default React.memo(SvgAdd)
