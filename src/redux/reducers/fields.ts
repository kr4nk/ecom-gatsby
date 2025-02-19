import { fromJS, Map } from 'immutable'
import { Action as ReduxAction } from 'redux'
import { handleActions } from 'redux-actions'

import { ReduxState } from '../../types/common'

import {
  LOGOUT,

  FETCH_REQUEST,
  FETCH_SUCCESS,
  FETCH_FAILURE,
  FETCH_COMPLETE,

  CALL_ACTION,

  SET_IN,
  CHANGE_INPUT,
  CHANGE_CHECKBOX,

  VALIDATE_INPUT,
  VALIDATE_INPUT_BY_FLAG,

  SELECT_COMBOBOX,
  SELECT_COMBOBOX_AND_ADD_TO_LIST,

  REMOVE_FROM_LIST_BY_INDEX,
  REMOVE_FROM_LIST_BY_VALUE,
  ADD_TO_LIST_WITH_TEMPLATE,
  ADD_TO_LIST,
  ADD_TO_LIST_UNIQUE,
  CHANGE_LIST_ITEM,

  MAP_SET,
  MAP_REMOVE,
  MAP_REMOVE_IN,

  PAGINATION_TO_BEGIN,
  PAGINATION_TO_END,
  PAGINATION_GO_NEXT,
  PAGINATION_GO_BACK
} from '../action-types'

import * as adminTools from './admin-tools'
import * as adminUsers from './admin-users-fields'
import * as adminUserNew from './admin-user-new'
import * as adminUserEdit from './admin-user-edit'
import * as adminWarehouses from './admin-warehouses'
import * as adminWarehouseNew from './admin-warehouse-new'
import * as adminWarehouseEdit from './admin-warehouse-edit'

import * as managerUsers from './manager-users-fields'
import * as managerUserNew from './manager-user-new-fields'
import * as managerUserEdit from './manager-user-edit-fields'

import * as managerOrder from './manager-order-fields'
import * as managerOrders from './manager-orders-fields'

import * as managerCategories from './manager-categories-fields'
import * as managerCategoryNew from './manager-category-new-fields'
import * as managerCategoryEdit from './manager-category-edit-fields'

import * as managerProducts from './manager-products-fields'
import * as managerProductNew from './manager-product-new-fields'
import * as managerProductEdit from './manager-product-edit-fields'

import * as managerManufacturers from './manager-manufacturers-fields'
import * as managerManufacturerNew from './manager-manufacturer-new-fields'
import * as managerManufacturerEdit from './manager-manufacturer-edit-fields'

import * as managerWarehouses from './manager-warehouses-fields'

import * as managerGroups from './manager-groups-fields'
import * as managerGroupNew from './manager-group-new-fields'
import * as managerGroupEdit from './manager-group-edit-fields'

import * as managerCertificates from './manager-certificates-fields'

import * as managerUploads from './manager-uploads-fields'
import * as managerTools from './manager-tools'

import * as userCart from './user-cart-fields'
import * as userOrder from './user-order-fields'
import * as userOrders from './user-orders-fields'
import * as userCategories from './user-categories-fields'
import * as userCertificates from './user-certificates-fields'
import * as userManufacturers from './user-manufacturers-fields'
import * as userWarehouses from './user-warehouses-fields'
import * as userProfile from './user-profile-fields'
import * as userShop from './user-shop'
import * as userProducts from './user-products-fields'
import * as userRegistration from './user-registration-fields'
import * as userDownloads from './user-downloads-fields'

import * as defaultContactUs from './default-contact-us'

import * as authForgot from './auth-forgot'
import * as authSignin from './auth-signin'
import * as authSignup from './auth-signup'
import * as authConfirm from './auth-confirm'
import * as authPassword from './auth-password'
import * as authReset from './auth-reset'

import * as user from './user'

import {
  IS_FETCHING,
  ERROR,
  ERROR_MESSAGE,

  USER,
  AUTH_FORGOT,
  AUTH_CONFIRM,
  AUTH_PASSWORD,
  AUTH_RESET,
  AUTH_SIGNIN,
  AUTH_SIGNUP,

  DEFAULT_CONTACT_US,

  USER_SHOP,
  USER_PROFILE,
  USER_CATEGORIES,
  USER_MANUFACTURERS,
  USER_CERTIFICATES,
  USER_PRODUCTS,
  USER_WAREHOUSES,
  USER_REGISTRATION,
  USER_ORDERS,
  USER_ORDER,
  USER_CART,
  USER_DOWNLOADS,

  ADMIN_TOOLS,
  ADMIN_USERS,
  ADMIN_USER_NEW,
  ADMIN_USER_EDIT,
  ADMIN_WAREHOUSES,
  ADMIN_WAREHOUSE_NEW,
  ADMIN_WAREHOUSE_EDIT,

  MANAGER_USERS,
  MANAGER_USER_NEW,
  MANAGER_USER_EDIT,
  MANAGER_ORDERS,
  MANAGER_ORDER,
  MANAGER_CATEGORIES,
  MANAGER_CATEGORY_EDIT,
  MANAGER_CATEGORY_NEW,
  MANAGER_MANUFACTURERS,
  MANAGER_MANUFACTURER_EDIT,
  MANAGER_MANUFACTURER_NEW,
  MANAGER_WAREHOUSES,
  MANAGER_GROUPS,
  MANAGER_GROUP_EDIT,
  MANAGER_GROUP_NEW,
  MANAGER_CERTIFICATES,
  MANAGER_UPLOADS,
  MANAGER_TOOLS,
  MANAGER_PRODUCTS,
  MANAGER_PRODUCT_EDIT,
  MANAGER_PRODUCT_NEW,

  VALUE,
  ID,
  INVALID,
  VALID,
  LIST,
  TEMPLATE,
  MAP,
  IDS,
  PAGE_SIZE,
  PAST
} from '../selector-consts'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const handlerList: any = {}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function registerHandlers (mapOfData: any): void {
  Object.assign(handlerList, mapOfData)
}

// Регистрация данных о полях страниц, которые были испортированы выше
// В формате combineReducers
// Кроме самих данных, импортируемые модули полей могут содержать переорпеделения
// таких функций как fetchRequest, fetchSuccess и fetchFailure
registerHandlers({
  [USER]: user,
  [ADMIN_TOOLS]: adminTools,
  [ADMIN_USERS]: adminUsers,
  [ADMIN_USER_NEW]: adminUserNew,
  [ADMIN_USER_EDIT]: adminUserEdit,
  [ADMIN_WAREHOUSES]: adminWarehouses,
  [ADMIN_WAREHOUSE_NEW]: adminWarehouseNew,
  [ADMIN_WAREHOUSE_EDIT]: adminWarehouseEdit,
  [AUTH_CONFIRM]: authConfirm,
  [AUTH_FORGOT]: authForgot,
  [AUTH_PASSWORD]: authPassword,
  [AUTH_RESET]: authReset,
  [AUTH_SIGNIN]: authSignin,
  [AUTH_SIGNUP]: authSignup,
  [DEFAULT_CONTACT_US]: defaultContactUs,
  [MANAGER_USERS]: managerUsers,
  [MANAGER_USER_NEW]: managerUserNew,
  [MANAGER_USER_EDIT]: managerUserEdit,
  [MANAGER_ORDERS]: managerOrders,
  [MANAGER_ORDER]: managerOrder,
  [MANAGER_CATEGORIES]: managerCategories,
  [MANAGER_CATEGORY_EDIT]: managerCategoryEdit,
  [MANAGER_CATEGORY_NEW]: managerCategoryNew,
  [MANAGER_MANUFACTURERS]: managerManufacturers,
  [MANAGER_MANUFACTURER_EDIT]: managerManufacturerEdit,
  [MANAGER_MANUFACTURER_NEW]: managerManufacturerNew,
  [MANAGER_WAREHOUSES]: managerWarehouses,
  [MANAGER_GROUPS]: managerGroups,
  [MANAGER_GROUP_EDIT]: managerGroupEdit,
  [MANAGER_GROUP_NEW]: managerGroupNew,
  [MANAGER_CERTIFICATES]: managerCertificates,
  [MANAGER_UPLOADS]: managerUploads,
  [MANAGER_TOOLS]: managerTools,
  [MANAGER_PRODUCTS]: managerProducts,
  [MANAGER_PRODUCT_EDIT]: managerProductEdit,
  [MANAGER_PRODUCT_NEW]: managerProductNew,
  [USER_CART]: userCart,
  [USER_CATEGORIES]: userCategories,
  [USER_CERTIFICATES]: userCertificates,
  [USER_DOWNLOADS]: userDownloads,
  [USER_MANUFACTURERS]: userManufacturers,
  [USER_ORDER]: userOrder,
  [USER_ORDERS]: userOrders,
  [USER_PRODUCTS]: userProducts,
  [USER_PROFILE]: userProfile,
  [USER_REGISTRATION]: userRegistration,
  [USER_SHOP]: userShop,
  [USER_WAREHOUSES]: userWarehouses
})

const initialState: ReduxState = fromJS(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  Object.entries<any>(handlerList)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    .reduce<any>(function reducer (acc, pair): any { // TODO
      const [name, data] = pair

      acc[name] = data.initialFields

      return acc
    }, {})
)

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface Action<T = any> extends ReduxAction<string> {
  payload: T;
}

function defaultFetchRequest (state: ReduxState): ReduxState {
  return state
    .merge({
      [IS_FETCHING]: true,
      [ERROR]: false,
      [ERROR_MESSAGE]: ''
    })
}

function defaultFetchSuccess (state: ReduxState, { payload: { path: _path, ...rest } }: Action): ReduxState {
  return state
    .mergeDeep({
      [IS_FETCHING]: false,
      [ERROR]: false,
      [ERROR_MESSAGE]: '',
      ...rest
    })
}

function defaultFetchFailure (state: ReduxState, { payload: { path: _path, ...rest } }: Action): ReduxState {
  return state
    .mergeDeep({
      [IS_FETCHING]: false,
      [ERROR]: true,
      ...rest
    })
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default handleActions<ReduxState, any>({
  // Request
  [FETCH_REQUEST] (state, action): ReduxState {
    const path = action.payload.path instanceof Array && action.payload.path[0]
    const data = handlerList[path]
    const handler = (data && data.fetchRequest) || defaultFetchRequest

    return state
      .set(path, handler(state.get(path), action))
  },

  [FETCH_SUCCESS] (state, action): ReduxState {
    const path = action.payload.path instanceof Array && action.payload.path[0]
    const data = handlerList[path]
    const handler = (data && data.fetchSuccess) || defaultFetchSuccess

    return state
      .set(path, handler(state.get(path), action))
  },

  [FETCH_FAILURE] (state, action): ReduxState {
    const path = action.payload.path instanceof Array && action.payload.path[0]
    const data = handlerList[path]
    const handler = (data && data.fetchFailure) || defaultFetchFailure

    return state.set(path, handler(state.get(path), action))
  },

  [LOGOUT] (state, action): ReduxState {
    for (let name in handlerList) {
      if (handlerList.hasOwnProperty(name)) {
        const section = handlerList[name]

        if (section.logOut instanceof Function) {
          state = state
            .set(name,
              section.logOut(state.get(name), action)
            )
        } else if (section.initialFields !== undefined) {
          state = state
            .set(name, fromJS(section.initialFields))
        }
      }
    }

    return state
  },

  [CALL_ACTION] (state, action): ReduxState {
    const path = action.payload.path instanceof Array && action.payload.path[0]

    if (!path) {
      console.warn('Action should be contains "path" parameter.')
      return state
    }

    const data = handlerList[path]
    const handler = data && data[action.payload.handlerName]

    if (!handler) {
      console.warn('Action should be contains "handlerName" parameter.')
      return state
    }

    return state
      .set(path, handler(state.get(path), action))
  },

  [FETCH_COMPLETE] (state, { payload: { path, ...rest } }): ReduxState {
    return state
      .mergeDeepIn(path, {
        [IS_FETCHING]: false,
        ...rest
      })
  },

  // Inputs
  [SET_IN] (state, { payload: { path, ...rest } }): ReduxState {
    return state
      .mergeIn(path, rest)
  },

  [CHANGE_INPUT] (state, { payload: { path, value, ...rest } }): ReduxState {
    return state
      .mergeIn(path, { value, ...rest })
  },

  [CHANGE_CHECKBOX] (state, { payload: { path, checked, ...rest } }): ReduxState {
    return state
      .mergeIn(path, { checked, ...rest })
  },

  [SELECT_COMBOBOX] (state, { payload: { path, ...rest } }): ReduxState {
    return state
      .mergeIn(path, rest)
  },

  [SELECT_COMBOBOX_AND_ADD_TO_LIST] (state, { payload: { path, pathOfList, value } }): ReduxState {
    return state
      .mergeIn(path, {
        [VALUE]: '',
        [ID]: '',
        [VALID]: false,
        [INVALID]: false
      })
      .updateIn([...pathOfList, LIST],
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        function updater (list): any { // TODO
          return list.includes(value)
            ? list
            : list.push(value)
        }
      )
  },

  [ADD_TO_LIST_WITH_TEMPLATE] (state, { payload: { path, ...rest } }): ReduxState {
    const field = state.getIn(path)
    const list = field.get(LIST)

    let item = field.get(TEMPLATE) || Map()
    item = item.mergeDeep(rest)

    return state
      .setIn(path, field.set(LIST,
        list.push(item)
      ))
  },

  [ADD_TO_LIST] (state, { payload: { path, value } }): ReduxState {
    return state
      .updateIn([...path, LIST],
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
        function updater (list): any { // TODO
          return list.push(value)
        }
      )
  },

  [ADD_TO_LIST_UNIQUE] (state, { payload: { path, value } }): ReduxState {
    return state
      .updateIn([...path, LIST],
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        function updater (list): any {
          return list.includes(value)
            ? list
            : list.push(value)
        }
      )
  },

  [REMOVE_FROM_LIST_BY_INDEX] (state, { payload: { path, index } }): ReduxState {
    return state
      .deleteIn([...path, LIST, index])
  },

  [REMOVE_FROM_LIST_BY_VALUE] (state, { payload: { path, value } }): ReduxState {
    return state
      .updateIn([...path, LIST],
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        function updater (list): any {
          const index = list.indexOf(value)
          return index !== -1
            ? list.delete(index)
            : list
        }
      )
  },

  [CHANGE_LIST_ITEM] (state, { payload: { path, index, ...rest } }): ReduxState {
    return state
      .mergeDeepIn([...path, LIST, index], rest)
  },

  [MAP_SET] (state, { payload: { path, key, value } }): ReduxState {
    return state
      .mergeDeepIn([...path, MAP], {
        [key]: fromJS(value)
      })
  },

  [MAP_REMOVE] (state, { payload: { path, key } }): ReduxState {
    return state
      .deleteIn([...path, MAP, key])
  },

  [MAP_REMOVE_IN] (state, { payload: { path, target } }): ReduxState {
    return state
      .deleteIn([...path, MAP, ...target])
  },

  // Validate inputs
  [VALIDATE_INPUT] (state, {
    payload: {
      path,
      value,
      isValid = (value !== ''),
      required = true,
      ...rest
    }
  }): ReduxState {
    return state
      .mergeIn(path, {
        value,
        valid: required ? isValid : (value !== '' && isValid),
        invalid: required ? !isValid : (value !== '' && !isValid),
        ...rest
      })
  },

  [VALIDATE_INPUT_BY_FLAG] (state, {
    payload: {
      path,
      value,
      isValid,
      required = true,
      ...rest
    }
  }): ReduxState {
    return state
      .mergeIn(path, {
        value,
        [VALID]: required ? isValid : (value !== '' && isValid),
        [INVALID]: required ? !isValid : (value !== '' && !isValid),
        ...rest
      })
  },

  // Pagination
  [PAGINATION_TO_BEGIN] (state, { payload: {
    path,
    paginationPath = []
  } }): ReduxState {
    return state
      .mergeIn([...path, ...paginationPath], {
        [PAST]: 0
      })
  },

  [PAGINATION_TO_END] (state, { payload: {
    path,
    total,
    listPath = [IDS],
    paginationPath = []
  } }): ReduxState {
    const section = state.getIn(path)
    const obj = section.getIn(paginationPath)

    if (total === undefined) {
      total = section.getIn(listPath).size
    }

    const pageSize = obj.get(PAGE_SIZE)

    const past = total - pageSize > 0
      ? total - pageSize
      : 0

    return state
      .mergeIn([...path, ...paginationPath], {
        [PAST]: past
      })
  },

  [PAGINATION_GO_NEXT] (state, { payload: {
    path,
    total,
    listPath = [IDS],
    paginationPath = []
  } }): ReduxState {
    const section = state.getIn(path)
    const obj = section.getIn(paginationPath)

    if (total === undefined) {
      total = section.getIn(listPath).size
    }

    const pageSize = obj.get(PAGE_SIZE)
    let past = obj.get(PAST) + pageSize

    if (past >= total) {
      past = obj.get(PAST)
    }

    return state
      .mergeIn([...path, ...paginationPath], {
        [PAST]: past
      })
  },

  [PAGINATION_GO_BACK] (state, { payload: {
    path,
    paginationPath = []
  } }): ReduxState {
    const section = state.getIn(path)
    const obj = section.getIn(paginationPath)

    const pageSize = obj.get(PAGE_SIZE)
    let past = obj.get(PAST) - pageSize

    if (past < 0) {
      past = 0
    }

    return state
      .mergeIn([...path, ...paginationPath], {
        [PAST]: past
      })
  }
}, initialState)
