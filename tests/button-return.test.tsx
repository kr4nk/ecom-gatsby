import * as React from 'react'
import * as renderer from 'react-test-renderer'

import ButtonReturn from '../src/components/common/button-return'

describe('ButtonReturn', () => {
  it('renders correctly', () => {
    const tree = renderer
      .create(<ButtonReturn text='Return' />)
      .toJSON()

    expect(tree).toMatchSnapshot()
  })
})
