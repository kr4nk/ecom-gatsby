import * as React from 'react'
import * as renderer from 'react-test-renderer'

import ButtonSignin from '../src/auth/common/button-signin'

describe('ButtonSignin', function test (): void {
  it('renders correctly', function test (): void {
    const tree = renderer
      .create(
        <ButtonSignin
          disabled={false}
        />
      )
      .toJSON()

    expect(tree).toMatchSnapshot()
  })
})
