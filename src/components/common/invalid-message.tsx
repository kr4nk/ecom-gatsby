import * as React from 'react'

import * as validation from '../../styles/validation.module.css'

interface OwnProps {
  value?: string;
  id: string;
}

function InvalidMessage ({ id, value }: OwnProps): JSX.Element {
  return (
    <p
      id={id}
      aria-live='assertive'
      className={validation.invalidFieldOrder}
    >
      { value }
    </p>
  )
}

InvalidMessage.defaultProps = {
  value: 'This field is required'
}

export default React.memo(InvalidMessage)
