import * as React from 'react'

import Tabs from './tabs'
import Files from './files'
import Brand from './brand'

import * as layout from '../../styles/layout.module.css'
import * as product from '../../styles/product.module.css'

import { TDangerHTML } from '../../types/common'
import { TProduct, TManufacturer } from '../../types/static'

import {
  DESC_FULL,
  DETAILS,
  DOWNLOADS,
  BRAND_INFO
} from '../../redux/selector-consts'

interface OwnProps {
  manufacturer: TManufacturer;
  product: TProduct;
}

interface TabItem {
  id: string;
  title: string;
}

function Info (props: OwnProps): JSX.Element {
  const tabs = React.useMemo(
    function setTabs (): TabItem[] {
      return [
        { id: DESC_FULL, title: 'Description' },
        { id: DETAILS, title: 'Details' },
        { id: DOWNLOADS, title: 'Downloads' },
        { id: BRAND_INFO, title: 'Brand info' }
      ]
    }, []
  )

  const [ selectedTab, setSelectedTab ] = React.useState(DESC_FULL)

  const details = React.useMemo(
    function setDetails (): TDangerHTML {
      return { __html: props.product.details }
    }, [ props.product.details ]
  )

  const descFull = React.useMemo(
    function setDescFull (): TDangerHTML {
      return { __html: props.product.descFull }
    }, [ props.product.descFull ]
  )

  const onKeyDown = React.useCallback<React.KeyboardEventHandler>(
    function onKeyDown (event): void {
      switch (event.key) {
        case 'End':
        case 'Home':
        case 'ArrowRight':
        case 'ArrowLeft':
          event.preventDefault()
          break
        default:
          break
      }

      switch (event.key) {
        case 'ArrowRight':
          setSelectedTab(function setSelectedTab (selectedTab): string {
            const index = (
              tabs.findIndex(
                function findIndex (tab): boolean {
                  return tab.id === selectedTab
                }
              ) + 1
            ) % tabs.length

            return tabs[index].id
          })
          break

        case 'ArrowLeft':
          setSelectedTab(function setSelectedTab (selectedTab): string {
            const index = (
              tabs.findIndex(
                function findIndex (tab): boolean {
                  return tab.id === selectedTab
                }
              ) - 1 + tabs.length
            ) % tabs.length

            return tabs[index].id
          })
          break

        case 'Home':
          setSelectedTab(tabs[0].id)
          break

        case 'End':
          setSelectedTab(tabs[tabs.length - 1].id)
          break

        default:
          break
      }
    }, [ tabs ]
  )

  const renderCurrentTab = React.useCallback(
    function useCallback (props: OwnProps, selectedTab: string): JSX.Element {
      switch (selectedTab) {
        case DESC_FULL:
          return (
            <div
              id='descFull-tab'
              role='tabpanel'
              aria-labelledby={DESC_FULL}
              dangerouslySetInnerHTML={descFull}
              tabIndex={0}
            />
          )
        case DETAILS:
          return (
            <div
              id='details-tab'
              role='tabpanel'
              tabIndex={0}
              aria-labelledby={DETAILS}
              dangerouslySetInnerHTML={details}
            />
          )
        case DOWNLOADS:
          return (
            <Files
              id={DOWNLOADS}
              files={props.product.files}
            />
          )
        case BRAND_INFO:
          return (
            <Brand
              id={BRAND_INFO}
              brand={props.manufacturer}
            />
          )
        default:
          return (<></>)
      }
    }, [ descFull, details ]
  )

  return (
    <section className={layout.section}>
      <Tabs
        tabs={tabs}
        current={selectedTab}
        onKeyDown={onKeyDown}
        onSelect={setSelectedTab}
      />

      <div className={product.productTabContent}>
        {
          renderCurrentTab(props, selectedTab)
        }
      </div>
    </section>
  )
}

export default Info
