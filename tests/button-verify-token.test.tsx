import * as React from 'react'
import * as renderer from 'react-test-renderer'

import ButtonVerifyToken from '../src/auth/common/button-verify-token'

describe('ButtonVerifyToken', function test (): void {
  it('renders correctly', function test (): void {
    const tree = renderer
      .create(
        <ButtonVerifyToken
          disabled={false}
        />
      )
      .toJSON()

    expect(tree).toMatchSnapshot()
  })
})
