import * as React from 'react'
import classnames from 'classnames'

import Category from './category'

import SvgPlus from '../../../components/svg/plus'
import SvgMinus from '../../../components/svg/minus'

import { ContextIndex } from '../../../context/index'

import * as userShop from '../../../styles/user-shop.module.css'
import * as utility from '../../../styles/utility.module.css'

function NavCategories (): JSX.Element {
  const { categoryIds, categoryItems } = React.useContext(ContextIndex)

  const [ expanded, setExpanded ] = React.useState(false)

  const toggleExpanded = React.useCallback<React.MouseEventHandler>(
    function toggleExpanded (): void {
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
        <h3>
          Categories
        </h3>

        <div
          role='img'
          aria-label={
            expanded
              ? 'Collapse'
              : 'Expand'
          }
          className={userShop.menuButtonIcon}
        >
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
          categoryIds.map(function mapper (id): JSX.Element {
            return (
              <Category
                key={id}
                category={categoryItems[id]}
              />
            )
          })
        }
      </ul>
    </div>
  )
}

export default React.memo(NavCategories)
