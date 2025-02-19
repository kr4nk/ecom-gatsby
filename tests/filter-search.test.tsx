import * as React from 'react'
import * as renderer from 'react-test-renderer'

import FilterSearch from '../src/components/common/filter-search'

const onChange = ({ target: { value } }: React.ChangeEvent<HTMLInputElement>): void => {
  console.info('FilterSearch onChange value: ', value)
}

describe('FilterSearch', () => {
  it('renders correctly', () => {
    const tree = renderer
      .create(
        <FilterSearch
          className='className'
          inputClassName='inputClassName'
          labelClassName='labelClassName'
          iconClassName='iconClassName'
          value='value'
          onChange={onChange}
        />
      )
      .toJSON()

    expect(tree).toMatchSnapshot()
  })
})
