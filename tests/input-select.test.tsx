import * as React from 'react'
import * as renderer from 'react-test-renderer'

import InputSelect from '../src/components/common/input-select'

const values = ['value', 'value2', 'value3', 'value4']

const onClick = (): void => {
  console.log('<InputSelect /> onChange')
}

const onFocus = (): void => {
  console.log('<InputSelect /> onFocus')
}

const onBlur = (): void => {
  console.log('<InputSelect /> onBlur')
}

describe('<InputSelect />', () => {
  it('renders correctly', () => {
    const tree = renderer
      .create(
        <InputSelect
          id='id'
          autoCapitalize='off'
          autoCorrect='off'
          autoComplete='off'
          disabled={false}
          required={false}
          readOnly={false}
          value='value'
          values={values}
          invalid={false}
          valid={false}
          invalidClassName='invalidClassName'
          validClassName='validClassName'
          placeholder='placeholder'
          onClick={onClick}
          onBlur={onBlur}
          onFocus={onFocus}
        />
      )
      .toJSON()

    expect(tree).toMatchSnapshot()
  })
})
