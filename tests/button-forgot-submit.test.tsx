import * as React from 'react'
import * as renderer from 'react-test-renderer'

import ButtonForgotSubmit from '../src/auth/common/button-forgot-submit'

describe('ButtonForgotSubmit', function test (): void {
  it('renders correctly', function test (): void {
    const tree = renderer
      .create(
        <ButtonForgotSubmit
          disabled={false}
        />
      )
      .toJSON()

    expect(tree).toMatchSnapshot()
  })
})
