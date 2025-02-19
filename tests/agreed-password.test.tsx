import { fromJS } from 'immutable'
import * as React from 'react'
import * as renderer from 'react-test-renderer'
import Agreed from '../src/auth/common/agreed-password'

const params = fromJS({
  checked: true
})

const onChange = () => {
  console.log('<Agreed /> onChange')
}

describe('Agreed', () => {
  it('renders correctly', () => {
    const tree = renderer
      .create(
        <Agreed
          params={params}
          disabled={false}
          onChange={onChange}
        />
      )
      .toJSON()

    expect(tree).toMatchSnapshot()
  })
})
