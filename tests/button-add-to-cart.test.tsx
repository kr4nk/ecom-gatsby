import * as React from 'react'
import * as renderer from 'react-test-renderer'

import ButtonAddToCart from '../src/components/common/button-add-to-cart'

const onClick = () => {
  console.info('<ButtonAddToCart /> onClick')
}

describe('<ButtonAddToCart />', () => {
  it('renders correctly', () => {
    const tree = renderer
      .create(
        <ButtonAddToCart
          onClick={onClick}
        />
      )
      .toJSON()

    expect(tree).toMatchSnapshot()
  })
})
