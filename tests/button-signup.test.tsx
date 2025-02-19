import * as React from 'react'
import * as renderer from 'react-test-renderer'

import ButtonSignup from '../src/auth/common/button-signup'

describe('ButtonSignup', function test (): void {
  it('renders correctly', function test (): void {
    const tree = renderer
      .create(
        <ButtonSignup
          disabled={false}
        />
      )
      .toJSON()

    expect(tree).toMatchSnapshot()
  })
})
