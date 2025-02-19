import * as React from 'react'

import Spinner from '../../components/common/spinner'

import ItemDownloads from '../downloads/item-downloads'

import * as tableResponsive from '../../styles/table-responsive.module.css'

import { TSiteDocuments } from '../../types/account'

import { ID } from '../../redux/selector-consts'

interface OwnProps {
  files: TSiteDocuments;
  isFetching: boolean;
}

const ListDownloads = ({ isFetching, files }: OwnProps): JSX.Element => (
  <ul className={tableResponsive.tableBody}>
    {
      // eslint-disable-next-line @getify/proper-arrows/return
      isFetching
        ? <Spinner />
        : (
          files.map(function mapper (file): JSX.Element {
            return (
              <ItemDownloads
                key={file.get(ID)}
                file={file}
              />
            )
          })
        )
    }
  </ul>
)

export default ListDownloads
