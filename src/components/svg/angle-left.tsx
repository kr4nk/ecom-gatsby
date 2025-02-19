import * as React from 'react'

function SvgAngleLeft (): JSX.Element {
  return (
    <svg viewBox='0 0 16 16'>
      <path
        fill='currentColor'
        d='M4.4,7.4l5.1-5.1c0.3-0.4,0.9-0.4,1.3,0l0.8,0.9C12,3.5,12,4,11.7,4.4L8,8l3.6,3.6c0.4,0.3,0.4,0.9,0,1.3l-0.8,0.8 c-0.3,0.4-0.9,0.4-1.3,0L4.4,8.6C4.1,8.3,4.1,7.7,4.4,7.4z'
      />
    </svg>
  )
}

export default React.memo(SvgAngleLeft)
