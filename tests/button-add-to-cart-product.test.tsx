import * as React from 'react'
import * as renderer from 'react-test-renderer'

import ButtonAddToCartProduct from '../src/components/common/button-add-to-cart-product'

const onClick = () => {
  console.info('<ButtonAddToCartProduct /> clicked')
}

describe('<ButtonAddToCartProduct />', () => {
  it('renders correctly', () => {
    const tree = renderer
      .create(
        <ButtonAddToCartProduct
          onClick={onClick}
        />
      )
      .toJSON()

    expect(tree).toMatchSnapshot()
  })
})
