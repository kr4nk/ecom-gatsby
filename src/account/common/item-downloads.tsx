import * as React from 'react'
import classnames from 'classnames'
import * as dayjs from 'dayjs'

import { getFileSize } from '../../utils/filesize'

import SvgDocumentSm from '../../components/svg/document-sm'
import SvgDownload from '../../components/svg/download'

import * as tableResponsive from '../../styles/table-responsive.module.css'
import * as buttons from '../../styles/buttons.module.css'
import * as managerUploads from '../../styles/manager-uploads.module.css'
import * as utility from '../../styles/utility.module.css'

import { TImmutableDocument } from '../../types/common'

import {
  ID, TYPE, NAME, SIZE, DATE
} from '../../redux/selector-consts'

interface OwnProps {
  file: TImmutableDocument;
  getProtectedFile(id: string, download?: boolean): void;
}

const getCssClassByFileType = (type: string): string => {
  switch (type) {
    case 'application/vnd.oasis.opendocument.text': // odt
    case 'application/msword': // doc
    case 'application/vnd.openxmlformats-officedocument.wordprocessingml.document': // docx
      return managerUploads.typeDoc
    case 'application/vnd.oasis.opendocument.spreadsheet': // ods
    case 'application/vnd.ms-excel': // xls
    case 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': // xlsx
      return managerUploads.typeXls
    case 'application/pdf':
      return managerUploads.typePdf
    default:
      return ''
  }
}

const ItemDownloads = ({ getProtectedFile, file }: OwnProps): JSX.Element => {
  const onClick = React.useCallback<React.MouseEventHandler>(
    function useCallback (): void {
      getProtectedFile(
        file.get(ID),
        true
      )
    }, [ file, getProtectedFile ]
  )

  return (
    <li>
      <div className={tableResponsive.tableRowResponsive}>
        <div
          className={
            classnames(
              tableResponsive.tableCell,
              tableResponsive.tableCellIcon
            )
          }
          data-title='Type'
        >
          <div
            role='img'
            aria-hidden
            className={
              classnames(
                managerUploads.iconDocSm,
                getCssClassByFileType(
                  file.get(TYPE)
                )
              )
            }
          >
            <SvgDocumentSm />
          </div>
        </div>

        <div
          className={tableResponsive.tableCell}
          data-title='Name'
        >
          <a
            title={`Go To File Download`}
            href={`/account/file/protected/${file.get(ID)}`}
            rel='noopener noreferrer'
            target='_blank'
          >
            {file.get(NAME)}
          </a>
        </div>

        <div
          className={
            classnames(
              tableResponsive.tableCell,
              tableResponsive.tableCellSmall,
              utility.tar
            )
          }
          data-title='Size'
        >
          {getFileSize(file.get(SIZE))}
        </div>

        <time
          data-title='Date'
          className={
            classnames(
              tableResponsive.tableCell,
              tableResponsive.tableCellSmall,
              utility.tar
            )
          }
          dateTime={
            dayjs(file.get(DATE))
              .toISOString()
          }
        >
          {
            dayjs(file.get(DATE))
              .format('DD MMM, YYYY hh:mm A')
          }
        </time>

        <div
          className={
            classnames(
              tableResponsive.tableCell,
              tableResponsive.tableCellSmall,
              utility.tar
            )
          }
          data-title='Action'
        >
          <button
            className={
              classnames(
                buttons.button,
                buttons.buttonPrimaryText,
                buttons.buttonIcon
              )
            }
            disabled={file.get(SIZE) === 0}
            onClick={onClick}
            type='button'
          >
            <div
              role='img'
              aria-hidden
              className={buttons.icon}
            >
              <SvgDownload />
            </div>

            Download
          </button>
        </div>
      </div>
    </li>
  )
}

export default ItemDownloads
