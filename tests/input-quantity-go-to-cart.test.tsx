import * as React from 'react'
import * as renderer from 'react-test-renderer'

import InputQuantityGoToCart from '../src/components/common/input-quantity-go-to-cart'

const onChange = (): void => {
  console.log('<InputQuantityGoToCart /> onChange')
}

describe('<InputQuantityGoToCart />', () => {
  it('renders correctly', () => {
    const tree = renderer
      .create(
        <InputQuantityGoToCart
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
