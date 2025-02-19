import * as React from 'react'

import Badges from '../order/badges'
import Dates from '../order/dates-order'
import ActionsOrder from '../order/actions-order'
import Payment from '../order/payment'
import PaymentInfo from '../order/payment-info'
import CustomerDetails from '../order/customer-details-order'
import CustomerAddress from '../order/customer-address-order'
import Shipping from '../order/shipping-order'
// import OrderTracking from './tracking'
import Products from '../order/products-order'
import Summary from '../order/summary-order'
import Refunds from '../order/refunds-order'
import Timeline from '../order/timeline'

import OrderRefundNew from '../order-refund-new'

import * as managerOrder from '../../styles/manager-order.module.css'
import * as layout from '../../styles/layout.module.css'
import * as utility from '../../styles/utility.module.css'
import { TOrder } from '../../types/account'

import {
  ID,
  TAXES_VALUE,
  // TRACKING,
  PAYMENT
} from '../../redux/selector-consts'

interface OwnProps {
  isFetching: boolean;
  order: TOrder;
}

const ContentOrder = ({ order, isFetching }: OwnProps): JSX.Element => (
  <div className={layout.content}>
    <div className={managerOrder.pageTitle}>
      <h1 className={utility.bold}>
        Order #{order.get(ID)}
      </h1>

      <Badges />
    </div>

    <Dates />

    <ActionsOrder />

    {
      // eslint-disable-next-line @getify/proper-arrows/return
      isFetching
        ? (<></>)
        : (
          <section className={layout.section}>
            <h2 className={layout.sectionTitle}>
              Payment
            </h2>

            {
              order.get(TAXES_VALUE) === null
                ? 'Please, wait for calculating shipping and taxes costs. You will be notified by email.'
                : order.get(PAYMENT)
                  ? (<PaymentInfo />)
                  : (<Payment />)
            }
          </section>
        )
    }

    <section className={layout.section}>
      <h2 className={layout.sectionTitle}>
        Customer
      </h2>

      <CustomerDetails />
    </section>

    <section className={layout.section}>
      <h2 className={layout.sectionTitle}>
        Billing Address
      </h2>

      <CustomerAddress />
    </section>

    <section className={layout.section}>
      <h2 className={layout.sectionTitle}>
        Shipping
      </h2>

      <Shipping />
    </section>

    {/* {
      order.get(STATUS) === ORDER_SHIPPED && (
        <section className={section}>
          <h2 className={sectionTitle}>
            Tracking
          </h2>

          <OrderTracking
            orderId={order.get(ID)}
            tracking={order.get(TRACKING)}
          />
        </section>
      )
    } */}

    <section className={layout.section}>
      <h2 className={layout.sectionTitle}>
        Summary
      </h2>

      <Products />

      <Summary />
    </section>

    <Refunds />

    <OrderRefundNew />

    <section className={layout.section}>
      <h2 className={layout.sectionTitle}>
        Timeline
      </h2>

      <Timeline />
    </section>
  </div>
)

export default ContentOrder
