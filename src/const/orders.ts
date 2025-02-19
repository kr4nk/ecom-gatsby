const orderStatus: string[] = [
  'current', // 0
  'pending', // 1
  'processing', // 2
  'shipped', // 3
  'complete', // 4
  'canceled', // 5
  'refund', // 6
  'refunded' // 7
]

export const ORDER_CURRENT = 0
export const ORDER_PENDING = 1
export const ORDER_PROCESSING = 2
export const ORDER_SHIPPED = 3
export const ORDER_COMPLETE = 4
export const ORDER_CANCELED = 5
export const ORDER_REFUND = 6
export const ORDER_REFUNDED = 7

export const getStatusByName = (name: string): number =>
  orderStatus.indexOf(name)

export const getStatusName = (index: number): string =>
  orderStatus[index]
