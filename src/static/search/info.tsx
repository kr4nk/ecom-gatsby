import * as React from 'react'

import Tabs from '../product/tabs'
import Files from '../product/files'
import Brand from './brand'

import * as productCss from '../../styles/product.module.css'
import * as layout from '../../styles/layout.module.css'

import {
  TProductFile,
  TProductDangerHTML,
  TManufacturerDangerHTML
} from '../../types/static'

import {
  DESC_FULL,
  DETAILS,
  DOWNLOADS,
  BRAND_INFO
} from '../../redux/selector-consts'

interface OwnProps {
  manufacturer: TManufacturerDangerHTML;
  product: TProductDangerHTML;
  files: TProductFile[];
}

interface TabItem {
  id: string;
  title: string;
}

export default function Info (props: OwnProps): JSX.Element {
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

  const onKeyDown = React.useCallback<React.KeyboardEventHandler>(
    function onKeyDown (e): void {
      switch (e.key) {
        case 'End':
        case 'Home':
        case 'ArrowRight':
        case 'ArrowLeft':
          e.preventDefault()
          break
        default:
          break
      }

      switch (e.key) {
        case 'ArrowRight':
          setSelectedTab(function setSelectedTab (selectedTab): string {
            const index = (
              tabs.findIndex(function findTabIndex (tab): boolean {
                return tab.id === selectedTab
              }) + 1
            ) % tabs.length

            return tabs[index].id
          })
          break

        case 'ArrowLeft':
          setSelectedTab(function setSelectedTab (selectedTab): string {
            const index = (
              tabs.findIndex(function findTabIndex (tab): boolean {
                return tab.id === selectedTab
              }) - 1 + tabs.length
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
    function renderCurrentTab (props: OwnProps, selectedTab: string): JSX.Element {
      switch (selectedTab) {
        case DESC_FULL:
          return (
            <div
              id='descFull-tab'
              role='tabpanel'
              tabIndex={0}
              aria-labelledby={DESC_FULL}
              className={productCss.productFormatPre}
              dangerouslySetInnerHTML={
                props.product.descFull
              }
            />
          )
        case DETAILS:
          return (
            <div
              id='details-tab'
              role='tabpanel'
              tabIndex={0}
              aria-labelledby={DETAILS}
              dangerouslySetInnerHTML={
                props.product.details
              }
            />
          )
        case DOWNLOADS:
          return (
            <Files
              id={DOWNLOADS}
              files={props.files}
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
    }, []
  )

  return (
    <section className={layout.section}>
      <Tabs
        tabs={tabs}
        current={selectedTab}
        onKeyDown={onKeyDown}
        onSelect={setSelectedTab}
      />

      <div className={productCss.productTabContent}>
        {
          renderCurrentTab(props, selectedTab)
        }
      </div>
    </section>
  )
}
