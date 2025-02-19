import * as React from 'react'
import * as renderer from 'react-test-renderer'

import InputSearch from '../src/components/common/input-search'

const onChange = (): void => {
  console.log('<InputSearch /> onChange')
}

const onFocus = (): void => {
  console.log('<InputSearch /> onFocus')
}

const onBlur = (): void => {
  console.log('<InputSearch /> onBlur')
}

describe('<InputSearch />', () => {
  it('renders correctly', () => {
    const tree = renderer
      .create(
        <InputSearch
          className='className'
          inputClassName='inputClassName'
          labelClassName='labelClassName'
          iconClassName='iconClassName'
          value='value'
          onChange={onChange}
          onFocus={onFocus}
          onBlur={onBlur}
        />
      )
      .toJSON()

    expect(tree).toMatchSnapshot()
  })
})
