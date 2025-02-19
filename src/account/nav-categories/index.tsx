import * as React from 'react'
import classnames from 'classnames'
import { connect } from 'react-redux'

import {
  getCategoriesIds,
  getCategoriesItems
} from '../../redux/selectors/user-categories'

import NavCategoriesCategory from './nav-categories-category'

import SvgPlus from '../../components/svg/plus'
import SvgMinus from '../../components/svg/minus'

import * as userShop from '../../styles/user-shop.module.css'
import * as utility from '../../styles/utility.module.css'

import { ReduxState, TImmutableIds } from '../../types/common'
import { TCategory, TCategories } from '../../types/account'

interface StateProps {
  ids: TImmutableIds;
  items: TCategories;
}

const Categories = (props: StateProps): JSX.Element => {
  const [ expanded, setExpanded ] = React.useState(false)

  const toggleExpanded = React.useCallback(
    function useCallback (): void {
      setExpanded(!expanded)
    }, [ expanded ]
  )

  return (
    <div className={userShop.menu}>
      <button
        className={
          classnames(
            userShop.menuButton,
            utility.df,
            utility.jcsb,
            utility.aic,
            utility.bold,
            utility.full
          )
        }
        onClick={toggleExpanded}
        type='button'
      >
        <h3>Categories</h3>

        <div className={userShop.menuButtonIcon}>
          {
            expanded
              ? (<SvgMinus />)
              : (<SvgPlus />)
          }
        </div>
      </button>

      <ul>
        {
          expanded &&
          props.ids.map(function mapper (id): JSX.Element {
            return (
              <NavCategoriesCategory
                key={id}
                category={props.items.get(id) as TCategory}
              />
            )
          })
        }
      </ul>
    </div>
  )
}

const mapStateToProps = (state: ReduxState): StateProps => ({
  ids: getCategoriesIds(state),
  items: getCategoriesItems(state)
})

export default connect(
  mapStateToProps
)(Categories)
