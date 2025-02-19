import * as React from 'react'

import { getProductFileUrl } from '../../aws/s3'

import * as product from '../../styles/product.module.css'

import { TProductFile } from '../../types/account'

import {
  NAME,
  DESC,
  SRC
} from '../../redux/selector-consts'

interface StateProps {
  file: TProductFile;
}

const FileProduct = ({ file }: StateProps): JSX.Element => (
  <li className={product.downloadsItem}>
    <a
      className={product.downloadsItemUrl}
      href={getProductFileUrl(file.get(SRC))}
      rel='noopener noreferrer nofollow'
      target='_blank'
    >
      { file.get(NAME) }
    </a>

    <p className={product.downloadItemDesc}>
      { file.get(DESC) }
    </p>
  </li>
)

export default FileProduct
