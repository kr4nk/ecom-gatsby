import * as React from 'react'

import SelectCountry from '../cart-common/select-country'

import InputAddressLine1 from '../cart-common/input-address-line-1'
import InputAddressLine2 from '../cart-common/input-address-line-2'
import InputCity from '../cart-common/input-city'
import InputZip from '../cart-common/input-zip'

import * as grid from '../../styles/grid.module.css'

import State from './state'

const CustomAddress = (): JSX.Element => (
  <div className={grid.row}>
    <InputAddressLine1 />

    <InputAddressLine2 />

    <InputCity />

    <SelectCountry />

    <State />

    <InputZip />
  </div>
)

export default CustomAddress
