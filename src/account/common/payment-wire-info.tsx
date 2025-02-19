import * as React from 'react'

import * as utility from '../../styles/utility.module.css'

interface StateProps {
  accountNumber: string;
  routingDirect: string;
  routingWire: string;
}

const PaymentWireInfo = ({ accountNumber, routingDirect, routingWire }: StateProps): JSX.Element => (
  <section>
    <h4 className={utility.mb8}>
      Wire Transfer Details
    </h4>

    <div className={utility.mb8}>
      Account number:

      <div className={utility.ust}>
        { accountNumber }
      </div>
    </div>

    <div>
      <div className={utility.mb8}>
        Routing numbers
      </div>

      <div className={utility.mb8}>
        Direct deposits, electronic payments:

        <div className={utility.ust}>
          { routingDirect }
        </div>
      </div>

      <div>
        Wire transfers (domestic):

        <div className={utility.ust}>
          { routingWire }
        </div>
      </div>
    </div>
  </section>
)

export default PaymentWireInfo
