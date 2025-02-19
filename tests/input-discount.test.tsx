import * as React from 'react'
import * as renderer from 'react-test-renderer'

import InputDiscount from '../src/components/common/input-discount'

const onChange = (): void => {
  console.log('<InputDiscount /> onChange')
}

describe('<InputDiscount />', () => {
  it('renders correctly', () => {
    const tree = renderer
      .create(
        <InputDiscount
          id='id'
          value={5}
          min={0}
          max={10}
          disabled={false}
          onChange={onChange}
        />
      )
      .toJSON()

    expect(tree).toMatchSnapshot()
  })
})
