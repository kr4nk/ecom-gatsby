import * as React from 'react'
import classnames from 'classnames'

import ButtonTab from './button-tab'

import * as product from '../../styles/product.module.css'
import * as utility from '../../styles/utility.module.css'

interface OwnProps {
  tabs: {
    id: string;
    title: string;
  }[];
  current: string;
  onKeyDown: React.KeyboardEventHandler;
  onSelect: (id: string) => void;
}

const TabsProduct = ({
  tabs,
  current,
  onSelect,
  // eslint-disable-next-line @getify/proper-arrows/params
  onKeyDown
}: OwnProps): JSX.Element => (
  <div
    role='tablist'
    aria-label='Product info'
    className={
      classnames(
        product.productTabs,
        utility.df,
        utility.fdr,
        utility.fww,
        utility.jcsb
      )
    }
  >
    {
      tabs.map(function mapper (tab): JSX.Element {
        return (
          <ButtonTab
            key={tab.id}
            id={tab.id}
            title={tab.title}
            selected={current === tab.id}
            onKeyDown={onKeyDown}
            onClick={onSelect}
          />
        )
      })
    }
  </div>
)

export default TabsProduct
