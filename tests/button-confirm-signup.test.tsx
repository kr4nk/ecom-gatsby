import * as React from 'react'
import * as renderer from 'react-test-renderer'

import ButtonConfirmSignup from '../src/auth/common/button-confirm-signup'

describe('ButtonConfirmSignup', function test (): void {
  it('renders correctly', function test (): void {
    const tree = renderer
      .create(
        <ButtonConfirmSignup
          disabled={false}
        />
      )
      .toJSON()

    expect(tree).toMatchSnapshot()
  })
})
