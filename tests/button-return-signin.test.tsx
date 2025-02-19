import * as React from 'react'
import * as renderer from 'react-test-renderer'

import ButtonReturnSignin from '../src/components/common/button-return-signin'

describe('ButtonReturnSignin', () => {
  it('renders correctly', () => {
    const tree = renderer
      .create(
        <ButtonReturnSignin />
      )
      .toJSON()

    expect(tree).toMatchSnapshot()
  })
})
