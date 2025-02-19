import * as React from 'react'
import classnames from 'classnames'
import { connect } from 'react-redux'

import { getSearchLoading } from '../../redux/selectors/user-shop'

import ButtonReturn from '../../components/common/button-return'
import Spinner from '../../components/common/spinner'

import InputSearch from './input-search'
import Products from './products-search'

import * as grid from '../../styles/grid.module.css'
import * as fields from '../../styles/fields.module.css'
import * as layout from '../../styles/layout.module.css'
import * as utility from '../../styles/utility.module.css'

import { ReduxState } from '../../types/common'

interface StateProps {
  isLoading: boolean;
}

const Search = ({ isLoading }: StateProps): JSX.Element => (
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
          <InputSearch
            className={
              classnames(
                fields.field,
                grid.colMd2
              )
            }
          />
        </div>

        {
          // eslint-disable-next-line @getify/proper-arrows/return
          isLoading
            ? <Spinner />
            : <Products />
        }
      </section>
    </div>
  </div>
)

const mapStateToProps = (state: ReduxState): StateProps => ({
  isLoading: getSearchLoading(state)
})

export default connect(
  mapStateToProps
)(Search)
