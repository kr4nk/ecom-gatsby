import * as printJS from 'print-js'
import { print } from 'graphql'
import { navigate } from '@reach/router'
import { event, exception } from 'react-ga'
import Auth from '@aws-amplify/auth'

import { getEndpoint } from '../../aws/amplify'

import toaster from '../../utils/toast'
import { isBrowser } from '../../utils/isbrowser'

import {
  getErrorMessage,
  getServerError
} from '../../utils/error'

import {
  getOrderId,
  getCartShipping,
  getCustomAddress,
  getWarehouseId,
  getFieldCartIds,
  getFieldCartItems,
  getFieldFromWarehouseToCustom
} from '../selectors/user-cart'

import { getProductVersionAsText } from '../selectors/user-products'

import { graphqlRequest } from './common'

import {
  fetchRequest,
  fetchSuccess,
  fetchFailure,
  fetchComplete,

  callAction,

  setIn,
  addToList,
  addToListUnique,
  removeFromListByIndex,
  removeFromListByValue,

  mapSet,
  mapRemoveIn
} from './fields'

import gqlUser from '../../graphql/user.gql'

import {
  Dispatch,
  GetState,
  FieldsAction,
  DebouncedFieldAction
} from '../../types/common'

import {
  IncCart,
  IncOrder,
  IncUserOrderProduct
} from '../../types/network'

import {
  USER_CART,
  PATH,
  LIST,
  MAP,
  FETCHING_VERSIONS,
  PENDING,
  VALUE,
  CHECKED
} from '../selector-consts'

const ENDPOINT = getEndpoint('user')

const path = [USER_CART]

interface PdfCart {
  type: string;
  content: Blob;
}

export function getOrderCopy (toEmail: boolean = false): FieldsAction {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return async function thunk (dispatch: Dispatch, getState: GetState): Promise<any> {
    dispatch(
      fetchRequest({
        path
      })
    )

    try {
      const jwtToken = (await Auth.currentSession())
        .getIdToken().getJwtToken()

      const result = await fetch(`${ENDPOINT}/cart-pdf`, {
        method: 'POST',
        mode: 'cors',
        // credentials: 'include',
        headers: {
          'Accept': 'application/json; application/pdf',
          'Content-Type': 'application/json',
          'Authorization': jwtToken
        },
        body: JSON.stringify({ toEmail })
      })
        .then(function success (response): Promise<PdfCart> {
          return toEmail
            ? response.json()
            : response.blob()
              .then(function asBlob (content): PdfCart {
                return {
                  type: response.headers.get('content-type') || '',
                  content
                }
              })
        })

      dispatch(
        fetchComplete({
          path
        })
      )

      event({
        category: 'User',
        action: 'Get Cart PDF',
        label: getOrderId(getState())
      })

      if (toEmail) {
        toaster.showSuccess('Copy of cart has been sended to your email.')
      } else {
        const blob = new window.Blob([result.content], {
          type: result.type
        })

        printJS(window.URL.createObjectURL(blob))
      }
    } catch (err) {
      exception({
        description: `[User Get Cart Copy] ${err.message}`,
        fatal: true
      })

      toaster.showError(err.message)

      dispatch(
        fetchFailure({
          path
        })
      )
    }
  }
}

export function getCart (): FieldsAction {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return function thunk (dispatch: Dispatch): any {
    dispatch(
      graphqlRequest({
        path,
        debugName: 'getCart',
        url: `${ENDPOINT}/graphql`,
        query: print(gqlUser.getCart)
      })
    )
      .then(function result ({ getCart }: { getCart: IncCart }): void {
        dispatch(
          fetchSuccess({
            path,
            cart: getCart
          })
        )
      })
  }
}

function localAddProductToCart (productId: string, versionId: string): FieldsAction {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, perf-standard/check-function-inline
  return function thunk (dispatch: Dispatch, getState: GetState): any {
    const state = getState()

    const ids = getFieldCartIds(state)
    const pathOfList = ids.get(PATH)

    if (ids.get(LIST).every(function every (id): boolean { return id !== productId })) {
      dispatch(
        addToList({
          path: pathOfList,
          value: productId
        })
      )
    }

    const items = getFieldCartItems(state)
    const pathOfMap = items.get(PATH)

    dispatch(
      mapSet({
        path: pathOfMap,
        key: productId,
        value: {
          [versionId]: 1
        }
      })
    )
  }
}

function localSetProductInCart (
  productId: string,
  versionId: string,
  value: number
): FieldsAction {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, perf-standard/check-function-inline
  return function thunk (dispatch: Dispatch, getState: GetState): any {
    const state = getState()

    const ids = getFieldCartIds(state)
    const pathOfList = ids.get(PATH)

    if (ids.get(LIST).every(function every (id): boolean {
      return id !== productId
    })) {
      dispatch(
        addToList({
          path: pathOfList,
          value: productId
        })
      )
    }

    const items = getFieldCartItems(state)
    const pathOfMap = items.get(PATH)

    dispatch(
      mapSet({
        path: pathOfMap,
        key: productId,
        value: {
          [versionId]: value
        }
      })
    )
  }
}

function localRemoveProductFromCart (
  productId: string,
  versionId: string
): FieldsAction {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, perf-standard/check-function-inline
  return function thunk (dispatch: Dispatch, getState: GetState): any {
    const state = getState()

    const items = getFieldCartItems(state)
    const pathOfMap = items.get(PATH)

    dispatch(
      mapRemoveIn({
        path: pathOfMap,
        target: [productId, versionId]
      })
    )

    if (items.getIn([MAP, productId]).size === 1) {
      const ids = getFieldCartIds(state)
      const pathOfList = ids.get(PATH)

      const index = ids.get(LIST).findIndex(function findIndex (id): boolean { return id === productId })

      if (index !== -1) {
        dispatch(
          removeFromListByIndex({
            path: pathOfList,
            index
          })
        )
      }
    }
  }
}

export function addCartItem (
  productId: string,
  versionId: string
): FieldsAction {
  return async function thunk (dispatch: Dispatch, getState: GetState): Promise<void> {
    if (isBrowser) {
      dispatch(
        localAddProductToCart(
          productId,
          versionId
        )
      )

      dispatch(
        addToListUnique({
          path: [...path, FETCHING_VERSIONS],
          value: versionId
        })
      )

      let errorMessage

      try {
        const jwtToken = (await Auth.currentSession())
          .getIdToken().getJwtToken()

        const result = await fetch(`${ENDPOINT}/graphql`, {
          method: 'POST',
          mode: 'cors',
          // credentials: 'include',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': jwtToken
          },
          body: JSON.stringify({
            query: print(gqlUser.updateOrderProduct),
            variables: {
              input: {
                productId,
                versionId,
                value: 1
              }
            }
          })
        })
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          .then(function success (request): any { return request.json() })

        // TODO Set result to confirmChangeCartItem to confirm addition
        if (result.data) {
          event({
            category: 'Cart',
            action: 'Added product to cart',
            label: getProductVersionAsText(
              getState(), { productId, versionId }
            ),
            value: 1
          })
        } else {
          errorMessage = getServerError(result)
        }
      } catch (err) {
        errorMessage = `Network Error: ${getErrorMessage(err)}`
      }

      dispatch(
        removeFromListByValue({
          path: [...path, FETCHING_VERSIONS],
          value: versionId
        })
      )

      if (errorMessage) {
        toaster.showError(errorMessage)

        dispatch(
          localRemoveProductFromCart(
            productId,
            versionId
          )
        )

        dispatch(
          fetchFailure({
            path,
            errorMessage
          })
        )

        exception({
          description: `[User Cart Add Cart Item] ${errorMessage}`,
          fatal: true
        })
      }
    }
  }
}

export function removeCartItem (
  productId: string,
  versionId: string
): FieldsAction {
  return async function thunk (dispatch: Dispatch, getState: GetState): Promise<void> {
    if (isBrowser) {
      const state = getState()

      const items = getFieldCartItems(state)
      const quantity = items.getIn([MAP, productId, versionId], 0) as number

      dispatch(
        localRemoveProductFromCart(
          productId,
          versionId
        )
      )

      dispatch(
        addToListUnique({
          path: [...path, FETCHING_VERSIONS],
          value: versionId
        })
      )

      let errorMessage

      try {
        const jwtToken = (await Auth.currentSession())
          .getIdToken().getJwtToken()

        const result = await fetch(`${ENDPOINT}/graphql`, {
          method: 'POST',
          mode: 'cors',
          // credentials: 'include',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': jwtToken
          },
          body: JSON.stringify({
            query: print(gqlUser.updateOrderProduct),
            variables: {
              input: {
                productId,
                versionId,
                value: 0
              }
            }
          })
        })
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          .then(function success (request): any { return request.json() })

        // console.log('removeCartItem result:', result)

        // TODO Set result to confirmChangeCartItem to confirm addition
        // TODO Implement both in claudia and redux
        if (result.data) {
          event({
            category: 'Cart',
            action: 'Removed product from cart',
            label: getProductVersionAsText(
              getState(), { productId, versionId }
            )
          })
        } else {
          errorMessage = getServerError(result)
        }
      } catch (err) {
        errorMessage = `Network Error: ${getErrorMessage(err)}`
      }

      dispatch(
        removeFromListByValue({
          path: [...path, FETCHING_VERSIONS],
          value: versionId
        })
      )

      if (errorMessage) {
        toaster.showError(errorMessage)

        dispatch(
          localSetProductInCart(
            productId,
            versionId,
            quantity
          )
        )

        dispatch(
          fetchFailure({
            path,
            errorMessage
          })
        )

        exception({
          description: `[RemoveCartItem] ${errorMessage}`,
          fatal: true
        })
      }
    }
  }
}

function saveVersionValue (
  productId: string,
  versionId: string,
  value: number
): DebouncedFieldAction {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const thunk = function thunk (dispatch: Dispatch, getState: GetState): any {
    dispatch(
      graphqlRequest({
        // path,
        debugName: 'saveVersionValue',
        url: `${ENDPOINT}/graphql`,
        query: print(gqlUser.updateOrderProduct),
        variables: {
          input: {
            productId,
            versionId,
            value
          }
        }
      })
    )
      .then(function success ({ updateOrderProduct }: { updateOrderProduct: IncUserOrderProduct }): void {
        dispatch(
          removeFromListByValue({
            path: [...path, FETCHING_VERSIONS],
            value: versionId
          })
        )

        const orderId = getOrderId(getState())

        if (
          updateOrderProduct.orderId &&
          orderId !== updateOrderProduct.orderId
        ) {
          dispatch(
            setIn({
              path,
              orderId: updateOrderProduct.orderId
            })
          )
        }

        event({
          category: 'Cart',
          action: 'Set quantity of product in cart',
          label: getProductVersionAsText(
            getState(), { productId, versionId }
          ),
          value
        })
      })
  }

  thunk.meta = {
    debounce: {
      key: `cart:${versionId}`,
      time: 3000,
      leading: false,
      trailing: true
    }
  }

  return thunk
}

interface MapOfFunctions {
  [key: string]: undefined | typeof saveVersionValue;
}

const debounceProducts: MapOfFunctions = {}

export function setVersionValue (
  productId: string,
  versionId: string,
  value: number
): FieldsAction {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, perf-standard/check-function-inline
  return function thunk (dispatch: Dispatch): any {
    if (value > 0) {
      dispatch(
        localSetProductInCart(
          productId,
          versionId,
          value
        )
      )
    } else {
      dispatch(
        localRemoveProductFromCart(
          productId,
          versionId
        )
      )
    }

    dispatch(
      addToListUnique({
        path: [...path, FETCHING_VERSIONS],
        value: versionId
      })
    )

    let debounce = debounceProducts[versionId]

    if (debounce === undefined) {
      debounce = debounceProducts[versionId] = saveVersionValue
    }

    dispatch(
      debounce(productId, versionId, value)
    )
  }
}

export function makeOrder (): FieldsAction {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return function thunk (dispatch: Dispatch): any {
    dispatch(
      graphqlRequest({
        path,
        debugName: 'makeOrder',
        url: `${ENDPOINT}/graphql`,
        headers: {
          'Content-Type': 'application/json'
        },
        getBody (getState): string {
          const state = getState()

          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          let input: any = {
            id: getOrderId(state),
            status: PENDING,
            shipping: getCartShipping(state).get(VALUE)
          }

          switch (input.shipping) {
            case 'custom':
              input = {
                ...input,
                ...getCustomAddress(state)
              }
              break
            case 'pickup': {
              input = {
                ...input,
                warehouseId: getWarehouseId(state)
              }

              const toCustom = getFieldFromWarehouseToCustom(state)

              if (toCustom.get(CHECKED)) {
                input = {
                  ...input,
                  ...getCustomAddress(state),
                  fromWarehouseToCustom: true
                }
              }

              break
            }
            default:
              break
          }

          return JSON.stringify({
            query: print(gqlUser.updateOrder),
            variables: { input }
          })
        }
      })
    )
      .then(async function result ({ updateOrder }: { updateOrder: IncOrder }): Promise<void> {
        if (updateOrder.pendingAt) {
          event({
            category: 'Cart',
            action: 'Make Order',
            label: updateOrder.id
          })

          await navigate(`/account/order/${updateOrder.id}`)

          dispatch(
            callAction({
              path,
              handlerName: 'clearCart'
            })
          )
        } else {
          dispatch(
            fetchComplete({
              path
            })
          )
        }
      })
  }
}
