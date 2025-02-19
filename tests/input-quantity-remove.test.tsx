import * as React from 'react'
import * as renderer from 'react-test-renderer'

import InputQuantityRemove from '../src/components/common/input-quantity-remove'

const onChange = (): void => {
  console.log('<InputQuantityRemove /> onChange')
}

const onRemove = (): void => {
  console.log('<InputQuantityRemove /> onRemove')
}

describe('<InputQuantityRemove />', () => {
  it('renders correctly', () => {
    const tree = renderer
      .create(
        <InputQuantityRemove
          id='id'
          value={5}
          min={0}
          max={10}
          onChange={onChange}
          onRemove={onRemove}
        />
      )
      .toJSON()

    expect(tree).toMatchSnapshot()
  })
})
