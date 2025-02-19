import * as React from 'react'
import classnames from 'classnames'

import { getFileSize } from '../../utils/filesize'

import SvgUpload from '../../components/svg/upload'

import * as layout from '../../styles/layout.module.css'
import * as grid from '../../styles/grid.module.css'
import * as fields from '../../styles/fields.module.css'
import * as buttons from '../../styles/buttons.module.css'
import * as utility from '../../styles/utility.module.css'

import { TUserFile } from '../../types/account'

import { SRC } from '../../redux/selector-consts'

interface OwnProps {
  disabled: boolean;
  params: TUserFile;
  uploadExemption(file: File): void;
}

const TaxExemptionFormUpload = (props: OwnProps): JSX.Element => {
  const inputRef = React.useRef<HTMLInputElement>(null)
  const [file, setFile] = React.useState<File | null>(null)

  const onChange = React.useCallback<React.ReactEventHandler>(
    function useCallback ({ target: { files } }: React.ChangeEvent<HTMLInputElement>): void {
      if (
        files instanceof FileList &&
        files.length > 0 &&
        files[0] instanceof File
      ) {
        const file = files[0]

        setFile(file)
      }
    }, []
  )

  const onClick = React.useCallback<React.MouseEventHandler>(
    function useCallback (): void {
      if (inputRef.current !== null) {
        inputRef.current.click()
      }
    }, []
  )

  const { uploadExemption } = props

  const onClickUpload = React.useCallback<React.MouseEventHandler>(
    function useCallback (): void {
      if (file !== null) {
        uploadExemption(file)
      }
    }, [ file, uploadExemption ]
  )

  return (
    <>
      <h2 className={layout.sectionTitle}>
        Tax exemption form
      </h2>

      <p className={layout.paragraph}>
        Please upload your Tax Exemption Form if you have one.
      </p>

      {
        props.params.get(SRC) !== '' && (
          <div
            className={
              classnames(
                grid.row,
                utility.mb8
              )
            }
          >
            <div
              className={
                classnames(
                  fields.field,
                  grid.colMd3
                )
              }
            >
              Uploaded form

              <div className={fields.text}>
                {
                  props.params.get(SRC) !== '' && (
                    <a
                      rel='noopener noreferrer'
                      href='/account/file/exemption'
                      target='_blank'
                      className={utility.wwbw}
                    >
                      {props.params.get(SRC)}
                    </a>
                  )
                }
              </div>
            </div>

            <div
              className={
                classnames(
                  fields.field,
                  utility.df,
                  grid.colMd1
                )
              }
            >
              <a
                href='/account/file/exemption'
                rel='noopener noreferrer'
                target='_blank'
                className={
                  classnames(
                    buttons.button,
                    buttons.buttonField,
                    utility.tdn
                  )
                }
              >
                View Form
              </a>
            </div>
          </div>
        )
      }

      <div
        className={
          classnames(
            grid.row,
            utility.mb8
          )
        }
      >
        <input
          ref={inputRef}
          className={utility.dn}
          type='file'
          accept='.pdf'
          disabled={props.disabled}
          onChange={onChange}
        />

        <div
          className={
            classnames(
              fields.field,
              grid.colMd3
            )
          }
        >
          Choose file (.pdf)

          <div className={fields.text}>
            {
              file === null
                ? 'No file chosen'
                : `${file.name} (${file.type}) ${getFileSize(file.size)}`
            }
          </div>
        </div>

        <div
          className={
            classnames(
              fields.field,
              utility.df,
              grid.colMd1
            )
          }
        >
          <button
            className={
              classnames(
                buttons.button,
                buttons.buttonField
              )
            }
            onClick={onClick}
            disabled={props.disabled}
            type='button'
          >
            Choose File
          </button>
        </div>
      </div>

      <div
        className={
          classnames(
            fields.fieldSet,
            grid.row
          )
        }
      >
        <div
          className={
            classnames(
              fields.field,
              grid.colMd1
            )
          }
        >
          {
            props.params.get(SRC) === ''
              ? (
                <button
                  className={
                    classnames(
                      buttons.button,
                      buttons.buttonPrimary,
                      buttons.buttonIcon,
                      utility.full
                    )
                  }
                  onClick={onClickUpload}
                  disabled={props.disabled}
                  type='button'
                >
                  <div
                    role='img'
                    aria-hidden
                    className={buttons.icon}
                  >
                    <SvgUpload />
                  </div>

                  Upload
                </button>
              )
              : (
                <button
                  className={
                    classnames(
                      buttons.button,
                      buttons.buttonDanger,
                      buttons.buttonIcon,
                      utility.full
                    )
                  }
                  onClick={onClickUpload}
                  disabled={props.disabled}
                  type='button'
                >
                  <div
                    role='img'
                    aria-hidden
                    className={buttons.icon}
                  >
                    <SvgUpload />
                  </div>

                  Reupload
                </button>
              )
          }
        </div>
      </div>
    </>
  )
}

export default TaxExemptionFormUpload
