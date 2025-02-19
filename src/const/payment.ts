export const PAYMENT_WIRE = 'wire-transfer'
export const PAYMENT_CARD = 'credit-card'

const paymentMethods: { [key: string]: string } = {
  [PAYMENT_WIRE]: 'Wire Transfer',
  [PAYMENT_CARD]: 'Credit Card'
}

export const getPaymentName = (payment: string): string =>
  paymentMethods[payment]
