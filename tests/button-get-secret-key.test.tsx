import * as React from 'react'
import * as renderer from 'react-test-renderer'

import ButtonGetSecretKey from '../src/auth/common/button-get-secret-key'

const onClick = () => {
  console.log('<ButtonGetSecretKey /> onClick')
}

describe('ButtonGetSecretKey', () => {
  it('renders correctly', () => {
    const tree = renderer
      .create(
        <ButtonGetSecretKey
          disabled={false}
          onClick={onClick}
        />
      )
      .toJSON()

    expect(tree).toMatchSnapshot()
  })
})
