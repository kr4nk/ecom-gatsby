import * as printJS from 'print-js'
import { print } from 'graphql'
import { navigate } from '@reach/router'
import { event, exception } from 'react-ga'
import Auth from '@aws-amplify/auth'

import { getEndpoint } from '../../aws/amplify'

import {
  getStatusName,
  ORDER_PROCESSING,
  ORDER_CANCELED
} from '../../const/orders'

import toaster from '../../utils/toast'

import {
  getOrder as getOrderData,
  getFieldComment,
  getFieldPaymentMethod,
  getFieldCardName,
  getFieldCardNumber,
  getFieldCardExpDate,
  getFieldCardSecCode,
  getEventFirstKey,
  getEventLastKey,

  getRefundData,
  getRefundEventLastKey,
  getFieldRefundMessage,

  getRefundProductsMap,
  getFieldRefundReason
} from '../selectors/user-order'

import { graphqlRequest } from './common'

import {
  fetchRequest,
  fetchSuccess,
  fetchFailure,
  fetchComplete,

  callAction
} from './fields'

import gqlUser from '../../graphql/user.gql'

import {
  GetState,
  Dispatch,
  FieldsAction
} from '../../types/common'

import {
  ResultGetOrder,
  IncOrder,
  IncOrderEvent,
  IncOrderRefundEvent
} from '../../types/network'

import {
  USER_ORDER, ID, VALUE
} from '../selector-consts'

const ENDPOINT = getEndpoint('user')

const path = [USER_ORDER]

export function getOrder (orderId: string): FieldsAction {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return function thunk (dispatch: Dispatch): any {
    dispatch(
      graphqlRequest({
        path,
        debugName: 'getOrder',
        url: `${ENDPOINT}/graphql`,
        query: print(gqlUser.getOrder),
        variables: {
          id: orderId
        }
      })
    )
      .then(function success (result: ResultGetOrder): void {
        dispatch(
          fetchSuccess({
            ...result,
            path
          })
        )
      })
  }
}

function getLastOrderEvents (direction?: string): FieldsAction {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return function thunk (dispatch: Dispatch, getState: GetState): any {
    const state = getState()
    const order = getOrderData(state)

    const nextToken = direction !== 'backward'
      ? getEventLastKey(state)
      : getEventFirstKey(state)

    dispatch(
      graphqlRequest({
        path,
        debugName: 'getLastOrderEvents',
        url: `${ENDPOINT}/graphql`,
        query: print(gqlUser.listOrderEvents),
        variables: {
          filter: { orderId: order.get(ID) },
          direction,
          nextToken
        }
      })
    )
      .then(function result ({ listOrderEvents }: { listOrderEvents: IncOrderEvent[] }): void {
        dispatch(
          callAction({
            listOrderEvents,
            handlerName: 'fetchEvents',
            path
          })
        )
      })
  }
}

export function sendComment (): FieldsAction {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return function thunk (dispatch: Dispatch, getState: GetState): any {
    const orderId = getOrderData(getState()).get(ID)

    dispatch(
      graphqlRequest({
        path,
        debugName: 'sendComment',
        url: `${ENDPOINT}/graphql`,
        query: print(gqlUser.createOrderEvent),
        variables: {
          input: {
            orderId,
            message: getFieldComment(getState()).get(VALUE)
          }
        }
      })
    )
      .then(function success (): void {
        dispatch(
          callAction({
            handlerName: 'successComment',
            path
          })
        )

        event({
          category: 'User',
          action: 'Send Comment to Order',
          label: orderId
        })

        toaster.showSuccess('Comment has been sent.')

        dispatch(
          getLastOrderEvents()
        )
      })
      .catch(function error (): void {
        dispatch(
          callAction({
            handlerName: 'failureComment',
            path
          })
        )
      })
  }
}

export function cancelOrder (): FieldsAction {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, perf-standard/check-function-inline
  return function thunk (dispatch: Dispatch, getState: GetState): any {
    const orderId = getOrderData(getState()).get(ID)

    dispatch(
      graphqlRequest({
        path,
        debugName: 'cancelOrder',
        url: `${ENDPOINT}/graphql`,
        query: print(gqlUser.updateOrder),
        variables: {
          input: {
            id: orderId,
            status: getStatusName(ORDER_CANCELED)
          }
        }
      })
    )
      .then(async function success (): Promise<void> {
        await navigate('/account/orders')

        event({
          category: 'User',
          action: 'Cancel Order',
          label: orderId
        })

        toaster.showSuccess('Your order has been canceled.')

        dispatch(
          fetchComplete({
            path
          })
        )
      })
  }
}

/**
 * Request refund
 */
export function requestRefund (): FieldsAction {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return function thunk (dispatch: Dispatch, getState: GetState): any {
    const state = getState()

    const reason = getFieldRefundReason(state).get(VALUE)

    if (reason.length === 0) {
      return
    }

    const refund = getRefundProductsMap(state)
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .reduce<any[]>(function reducer (acc, quantity, versionId): any[] {
        if (quantity > 0) {
          acc.push({
            versionId,
            quantity
          })
        }

        return acc
      }, [])

    if (refund.length === 0) {
      return
    }

    dispatch(
      graphqlRequest({
        path,
        debugName: 'requestRefund',
        url: `${ENDPOINT}/graphql`,
        query: print(gqlUser.updateOrder),
        variables: {
          input: {
            id: getOrderData(state).get(ID),
            status: 'refund',
            refund,
            reason
          }
        }
      })
    )
      .then(function result ({ updateOrder }: { updateOrder: IncOrder }): void {
        event({
          category: 'User',
          action: 'Request Order Refund',
          label: updateOrder.id
        })

        toaster.showSuccess('Your order refund is accepted and is pending.')

        dispatch(
          getOrder(updateOrder.id)
        )
      })
  }
}

/**
 * Get refund events
 */
export function fetchRefundEvents (index: number): FieldsAction {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return function thunk (dispatch: Dispatch, getState: GetState): any {
    const state = getState()
    const refund = getRefundData(state, index)
    const nextToken = getRefundEventLastKey(state, index)

    dispatch(
      graphqlRequest({
        path,
        debugName: 'fetchRefundEvents',
        url: `${ENDPOINT}/graphql`,
        query: print(gqlUser.listOrderRefundEvents),
        variables: {
          filter: {
            refundId: refund.get(ID)
          },
          nextToken
        }
      })
    )
      .then(function result ({ events }: { events: IncOrderRefundEvent[] }): void {
        dispatch(
          callAction({
            handlerName: 'fetchRefundEvents',
            events,
            index,
            path
          })
        )
      })
  }
}

/**
 * Send message in refund
 */
export function sendRefundMessage (index: number): FieldsAction {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return function thunk (dispatch: Dispatch, getState: GetState): any {
    const state = getState()

    const message = getFieldRefundMessage(state, index).get(VALUE)

    if (message.length === 0) {
      return
    }

    const refundId = getRefundData(state, index).get(ID)

    dispatch(
      graphqlRequest({
        path,
        debugName: 'sendRefundMessage',
        url: `${ENDPOINT}/graphql`,
        query: print(gqlUser.createOrderRefundEvent),
        variables: {
          input: {
            refundId,
            message
          }
        }
      })
    )
      .then(function success (): void {
        dispatch(
          callAction({
            handlerName: 'successRefundMessage',
            index,
            path
          })
        )

        event({
          category: 'User',
          action: 'Send Comment to Order Refund',
          label: refundId
        })

        toaster.showSuccess('Comment for refund has been sent.')

        dispatch(
          fetchRefundEvents(index)
        )
      })
  }
}

/**
 * Pay for Order
 */
export function payForOrder (): FieldsAction {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return function thunk (dispatch: Dispatch, getState: GetState): any {
    const state = getState()

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let input: any = {
      id: getOrderData(state).get(ID),
      status: getStatusName(ORDER_PROCESSING),
      payment: getFieldPaymentMethod(state).get(VALUE),
    }

    switch (input.payment) {
      case 'wire-transfer': {
        input = {
          ...input,
          isPaid: false
        }

        break
      }

      case 'credit-card': {
        input = {
          ...input,
          isPaid: true,
          card: {
            name: getFieldCardName(state).get(VALUE),
            number: getFieldCardNumber(state).get(VALUE),
            expDate: getFieldCardExpDate(state).get(VALUE),
            secCode: getFieldCardSecCode(state).get(VALUE)
          }
        }

        break
      }

      default:
        break
    }

    dispatch(
      graphqlRequest({
        path,
        debugName: 'payForOrder',
        url: `${ENDPOINT}/graphql`,
        query: print(gqlUser.updateOrder),
        variables: { input }
      })
    )
      .then(function success ({ updateOrder }: { updateOrder: IncOrder }): void {
        event({
          category: 'User',
          action: 'Select payment method for order',
          label: `orderId:${updateOrder.id} / payment:${updateOrder.payment}`
        })

        toaster.showSuccess(
          updateOrder.isPaid
            ? 'Your payment has been accepted.'
            : 'Order is waiting for your transfer.'
        )

        dispatch(
          getOrder(updateOrder.id)
        )
      })
  }
}

interface PdfOrder {
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

    const orderId = getOrderData(getState()).get(ID)

    try {
      const jwtToken = (await Auth.currentSession())
        .getIdToken().getJwtToken()

      const result = await fetch(`${ENDPOINT}/order-pdf/${orderId}`, {
        method: 'POST',
        mode: 'cors',
        // credentials: 'include'
        headers: {
          'Accept': 'application/json; application/pdf',
          'Content-Type': 'application/json',
          'Authorization': jwtToken
        },
        body: JSON.stringify({ toEmail })
      })
        .then(function success (response): Promise<PdfOrder> {
          return toEmail
            ? response.json()
            : response.blob()
              .then(function asBlob (content): PdfOrder {
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
        action: 'Get Order Copy',
        label: orderId
      })

      if (toEmail) {
        toaster.showSuccess('Copy of order has been sended to your email.')
      } else {
        const blob = new window.Blob([result.content], {
          type: result.type
        })

        printJS(window.URL.createObjectURL(blob))
      }
    } catch (err) {
      exception({
        description: `[User Get Order Copy] ${err.message}`,
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
