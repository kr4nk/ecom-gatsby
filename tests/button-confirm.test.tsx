import * as React from 'react'
import * as renderer from 'react-test-renderer'

import ButtonConfirm from '../src/auth/common/button-confirm'

describe('ButtonConfirm', function test (): void {
  it('renders correctly', function test (): void {
    const tree = renderer
      .create(
        <ButtonConfirm
          disabled={false}
        />
      )
      .toJSON()

    expect(tree).toMatchSnapshot()
  })
})
