import * as React from 'react'

import HeaderDownloads from '../common/header-downloads'
import ListDownloads from './list-downloads'
import CatalogDownloads from './catalog-downloads'

import * as layout from '../../styles/layout.module.css'

const Downloads = (): JSX.Element => (
  <div className={layout.container}>
    <div className={layout.content}>
      <h1 className={layout.pageTitle}>
        Downloads
      </h1>

      <section className={layout.section}>
        <h2 className={layout.sectionTitle}>
          Catalog
        </h2>

        <HeaderDownloads />

        <CatalogDownloads />
      </section>

      <section className={layout.section}>
        <h2 className={layout.sectionTitle}>
          Documents
        </h2>

        <HeaderDownloads />

        <ListDownloads />
      </section>
    </div>
  </div>
)

export default Downloads
