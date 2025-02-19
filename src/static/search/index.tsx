import * as React from 'react'
import { debounce } from 'ts-debounce'
import classnames from 'classnames'

import FilterSearch from '../../components/common/filter-search'
import ButtonReturn from '../../components/common/button-return'
import Spinner from '../../components/common/spinner'

import Products from './products'

import * as grid from '../../styles/grid.module.css'
import * as fields from '../../styles/fields.module.css'
import * as layout from '../../styles/layout.module.css'
import * as utility from '../../styles/utility.module.css'

export default function Search (): JSX.Element {
  const [ value, setValue ] = React.useState('')
  const [ search, setSearch ] = React.useState('')
  const [ loading, setLoading ] = React.useState(false)

  const onSearch = React.useCallback(
    function onSearch (search: string): void {
      setSearch(search)
      setLoading(false)
    }, []
  )

  const debouncedSearch = React.useCallback(
    debounce(
      onSearch, 1000, { isImmediate: false }
    ), [ onSearch ]
  )

  const onChange = React.useCallback<React.ChangeEventHandler<HTMLInputElement>>(
    function onChange ({ target: { value } }): void {
      debouncedSearch(value)

      setValue(value)
      setLoading(true)
    }, [ debouncedSearch ]
  )

  return (
    <div className={layout.container}>
      <div className={layout.content}>
        <section className={layout.section}>
          <header
            className={
              classnames(
                utility.df,
                utility.jcsb
              )
            }
          >
            <h1 className={layout.pageTitle}>
              Search
            </h1>

            <div>
              <ButtonReturn />
            </div>
          </header>

          <div className={grid.row}>
            <FilterSearch
              className={
                classnames(
                  fields.field,
                  grid.colMd2
                )
              }
              value={value}
              onChange={onChange}
            />
          </div>

          {
            loading
              ? (<Spinner />)
              : (
                <Products
                  search={search}
                />
              )
          }
        </section>
      </div>
    </div>
  )
}
