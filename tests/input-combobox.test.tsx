import * as React from 'react'
import * as renderer from 'react-test-renderer'

import InputCombobox from '../src/components/common/input-combobox'

const values = ['value', 'value1', 'value2', 'value3']

const onChange = (): void =>
  console.log('<InputCombobox /> onChange')

const onClick = (): void =>
  console.log('<InputCombobox /> onClick')

const onBlur = (): void =>
  console.log('<InputCombobox /> onBlur')

describe('<InputCombobox />', () => {
  it('renders correctly', () => {
    const tree = renderer
      .create(
        <InputCombobox
          id='id'
          type='text'
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
          onChange={onChange}
          onClick={onClick}
          onBlur={onBlur}
        />
      )
      .toJSON()

    expect(tree).toMatchSnapshot()
  })
})
