import * as React from 'react'
import * as renderer from 'react-test-renderer'

import ButtonReset from '../src/auth/common/button-reset'

describe('ButtonReset', function test (): void {
  it('renders correctly', function test (): void {
    const tree = renderer
      .create(
        <ButtonReset
          disabled={false}
        />
      )
      .toJSON()

    expect(tree).toMatchSnapshot()
  })
})
