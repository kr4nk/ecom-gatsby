import { fromJS } from 'immutable'

import {
  ReduxState,
  ReduxAction
} from '../../types/common'

import {
  IncCategoryShort
} from '../../types/network'

import {
  IS_FETCHING,
  ERROR,
  ERROR_MESSAGE,
  IDS,
  ITEMS,
  CHILDREN
} from '../selector-consts'

export const initialFields = {
  [IS_FETCHING]: false,
  [ERROR]: false,
  [ERROR_MESSAGE]: '',

  [IDS]: [],
  [ITEMS]: {}
}

interface CategoryItem extends IncCategoryShort {
  children?: CategoryItem[];
}

interface ResultListCategories {
  list: CategoryItem[];
}

const sortCategories = (first: CategoryItem, second: CategoryItem): number =>
  first.sort - second.sort

export const fetchSuccess = (state: ReduxState, { payload: { list } }: ReduxAction<ResultListCategories>): ReduxState => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const assoc = list.reduce<any>(function reducer (acc, item): any {
    acc[item.id] = item

    return acc
  }, {})

  let categories = []

  for (const item of list) {
    if (item.parentId === 'none') {
      item.children = []

      categories.push(item)
    } else {
      const parent = assoc[item.parentId]

      let children = parent.children

      if (children === undefined) {
        children = parent.children = []
      }

      children.push(item)
    }
  }

  categories = categories
    .sort(sortCategories)

  return state
    .merge({
      [IS_FETCHING]: false,
      [ERROR]: false,
      [ERROR_MESSAGE]: '',
      [IDS]: fromJS(
        categories.map(function mapper ({ id }): string { return id })
      ),
      [ITEMS]: fromJS(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        categories.reduce<any>(function reducer (acc, item): any {
          acc[item.id] = item
          if (item.children !== undefined) {
            item.children.sort(sortCategories)
          }
          return acc
        }, {})
      )
    })
}

export const fetchFailure = (state: ReduxState, { payload: { path: _path, ...rest } }: ReduxAction): ReduxState =>
  state
    .mergeDeep({
      [IS_FETCHING]: false,
      [ERROR]: true,
      ...rest
    })

export const categoryMoveDown = (state: ReduxState, { payload: { parent, index } }: ReduxAction): ReduxState =>
  state
    .updateIn(
      // eslint-disable-next-line @getify/proper-arrows/return
      parent !== ''
        ? [ITEMS, parent, CHILDREN]
        : [IDS],
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      function updateIn (list): any {
        if (index >= list.size - 1) {
          return list
        }

        const item = list.get(index + 1)

        return list.set(index + 1, list.get(index))
          .set(index, item)
      }
    )

export const categoryMoveUp = (state: ReduxState, { payload: { parent, index } }: ReduxAction): ReduxState =>
  state
    .updateIn(
      // eslint-disable-next-line @getify/proper-arrows/return
      parent !== ''
        ? [ITEMS, parent, CHILDREN]
        : [IDS],
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      function updateIn (list): any {
        if (index <= 0) {
          return list
        }

        const item = list.get(index - 1)

        return list
          .set(index - 1, list.get(index))
          .set(index, item)
      }
    )

export const logOut = (state: ReduxState): ReduxState =>
  state
    .merge(fromJS(initialFields))
