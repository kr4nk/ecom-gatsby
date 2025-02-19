import * as React from 'react'

function SvgAngleDoubleLeft (): JSX.Element {
  return (
    <svg viewBox='0 0 16 16'>
      <path
        fill='currentColor'
        d='M8,7.4l5.1-5.1c0.4-0.4,0.9-0.4,1.3,0l0.8,0.8c0.4,0.4,0.4,0.9,0,1.3L11.6,8l3.6,3.6c0.4,0.4,0.4,0.9,0,1.3l-0.8,0.9 c-0.4,0.4-0.9,0.4-1.3,0L8,8.6C7.6,8.3,7.6,7.7,8,7.4L8,7.4z M0.8,8.6l5.1,5.1c0.4,0.4,0.9,0.4,1.3,0L8,12.9c0.4-0.4,0.4-0.9,0-1.3 L4.4,8L8,4.4C8.4,4,8.4,3.5,8,3.1L7.2,2.3c-0.4-0.4-0.9-0.4-1.3,0L0.8,7.4C0.4,7.7,0.4,8.3,0.8,8.6z'
      />
    </svg>
  )
}

export default React.memo(SvgAngleDoubleLeft)
