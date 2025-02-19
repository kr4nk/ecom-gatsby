import * as React from 'react'
import classnames from 'classnames'

import ProductFile from './file-product'

import * as product from '../../styles/product.module.css'
import * as utility from '../../styles/utility.module.css'

import { TProductFiles } from '../../types/account'

import { SRC } from '../../redux/selector-consts'

interface OwnProps {
  files: TProductFiles;
  id: string;
}

const FilesProduct = ({ id, files }: OwnProps): JSX.Element => (
  <ul
    id={`${id}-tab`}
    role='tabpanel'
    aria-labelledby={id}
    tabIndex={0}
    className={
      classnames(
        product.downloadList,
        utility.lsn
      )
    }
  >
    {
      files.map(function mapper (file): JSX.Element {
        return (
          <ProductFile
            key={file.get(SRC)}
            file={file}
          />
        )
      })
    }
  </ul>
)

export default FilesProduct
