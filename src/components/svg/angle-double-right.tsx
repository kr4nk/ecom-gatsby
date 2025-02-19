import * as React from 'react'

function SvgAngleDoubleRight (): JSX.Element {
  return (
    <svg viewBox='0 0 16 16'>
      <path
        fill='currentColor'
        d='M8,7.4c0.4,0.4,0.4,0.9,0,1.3l-5.1,5.1c-0.3,0.4-0.9,0.4-1.3,0l-0.8-0.9c-0.4-0.3-0.4-0.9,0-1.3L4.4,8L0.8,4.4 C0.4,4,0.4,3.5,0.8,3.1l0.8-0.8c0.3-0.4,0.9-0.4,1.3,0L8,7.4L8,7.4z M15.2,7.4l-5.1-5.1c-0.3-0.4-0.9-0.4-1.3,0L8,3.1 C7.6,3.5,7.6,4,8,4.4L11.6,8L8,11.6c-0.4,0.3-0.4,0.9,0,1.3l0.8,0.8c0.3,0.4,0.9,0.4,1.3,0l5.1-5.1C15.6,8.3,15.6,7.7,15.2,7.4z'
      />
    </svg>
  )
}

export default React.memo(SvgAngleDoubleRight)
