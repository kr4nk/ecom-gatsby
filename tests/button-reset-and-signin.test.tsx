import * as React from 'react'
import * as renderer from 'react-test-renderer'

import ButtonResetAndSignIn from '../src/auth/common/button-reset-and-signin'

describe('ButtonResetAndSignIn', function test (): void {
  it('renders correctly', function test (): void {
    const tree = renderer
      .create(
        <ButtonResetAndSignIn
          disabled={false}
        />
      )
      .toJSON()

    expect(tree).toMatchSnapshot()
  })
})
