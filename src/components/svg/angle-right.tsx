import * as React from 'react'

function SvgAngleRight (): JSX.Element {
  return (
    <svg viewBox='0 0 16 16'>
      <path
        fill='currentColor'
        d='M11.7,8.6l-5.1,5.1c-0.4,0.4-0.9,0.4-1.3,0l-0.8-0.8c-0.4-0.4-0.4-0.9,0-1.3L8,8L4.4,4.4C4.1,4,4.1,3.5,4.4,3.1l0.8-0.9 c0.4-0.4,0.9-0.4,1.3,0l5.1,5.1C12,7.7,12,8.3,11.7,8.6z'
      />
    </svg>
  )
}

export default React.memo(SvgAngleRight)
