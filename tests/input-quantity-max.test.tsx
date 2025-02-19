import * as React from 'react'
import * as renderer from 'react-test-renderer'

import InputQuantityMax from '../src/components/common/input-quantity-max'

const onChange = (): void => {
  console.log('<InputQuantityMax /> onChange')
}

describe('<InputQuantityMax />', () => {
  it('renders correctly', () => {
    const tree = renderer
      .create(
        <InputQuantityMax
          id='id'
          value={5}
          min={0}
          max={10}
          onChange={onChange}
        />
      )
      .toJSON()

    expect(tree).toMatchSnapshot()
  })
})
