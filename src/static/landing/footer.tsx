import * as React from 'react'
import * as classnames from 'classnames'

import * as utility from '../../styles/utility.module.css'
import * as landing from '../../styles/landing.module.css'

export default function Footer (): JSX.Element {
  return (
    <div className={landing.footer}>
      <div className={landing.section}>
        <h4
          className={
            classnames(
              landing.columnHeading,
              utility.tac
            )
          }
        >
          Products & Services
        </h4>

        <div className={landing.columns}>
          <div className={landing.column}>
            <h5 className={landing.columnTitle}>
columnTitle            </h5>

            <p className={landing.columnText}>columnText</p>

            <h5 className={landing.columnTitle}>
columnTitle            </h5>

            <p className={landing.columnText}>columnText</p>

            <h5 className={landing.columnTitle}>
columnTitle            </h5>

            <p className={landing.columnText}>columnText</p>

            <h5 className={landing.columnTitle}>
columnTitle            </h5>

            <p className={landing.columnText}>columnText</p>
          </div>

          <div className={landing.column}>
            <h5 className={landing.columnTitle}>
columnTitle            </h5>

            <ul className={utility.lsn}>
              <li className={landing.columnItem}>
columnItem              </li>

              <li className={landing.columnItem}>
columnItem              </li>

              <li className={landing.columnItem}>
columnItem              </li>

              <li className={landing.columnItem}>
columnItem              </li>

              <li
                className={landing.columnItem}
              >
               columnItem
              </li>

              <li className={landing.columnItem}>
              columnItem
              </li>
            </ul>

            <h5 className={landing.columnTitle}>
columnTitle            </h5>

            <p className={landing.columnText}>columnText</p>

            <h5 className={landing.columnTitle}>
columnTitle            </h5>

            <p className={landing.columnText}>columnText</p>
          </div>

          <div className={landing.column}>
            <h5 className={landing.columnTitle}>
columnTitle            </h5>

            <p className={landing.columnText}>columnText</p>

            <h5 className={landing.columnTitle}>
columnTitle            </h5>

            <p className={landing.columnText}>columnText</p>

            <h5 className={landing.columnTitle}>
columnTitle            </h5>

            <p className={landing.columnText}>
            columnText            </p>

            <h5 className={landing.columnTitle}>
columnTitle            </h5>

            <p className={landing.columnText}>
            columnText            
            </p>
          </div>
        </div>

        <div className={landing.footerCo}>
          Ⓒ&nbsp;ecom
        </div>
      </div>
    </div>
  )
}
