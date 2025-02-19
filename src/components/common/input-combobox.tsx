import * as React from 'react'
import classnames from 'classnames'

import SvgMoveDown from '../svg/move-down'
import SvgMoveUp from '../svg/move-up'

import OptionCombobox from './option-combobox'

import * as combobox from '../../styles/combobox.module.css'
import * as utility from '../../styles/utility.module.css'

import { OnOff } from '../../types/common'

interface OwnProps {
  id: string;
  name?: string;
  type: string;
  autoCapitalize: OnOff;
  autoComplete: OnOff;
  autoCorrect: OnOff;
  disabled?: boolean;
  required?: boolean;
  readOnly?: boolean;
  value: string;
  values: string[];
  invalid: boolean;
  valid: boolean;
  invalidClassName: string;
  validClassName: string;
  placeholder: string;

  onChange (value: string): void;
  onClick (index: number): void;
  onBlur (index: number, value: string): void;
}

function InputCombobox (props: OwnProps): JSX.Element {
  const [ open, setOpen ] = React.useState(false)
  const [ activeIndex, setActiveIndex ] = React.useState(-1)
  const [ selectedIndex, setSelectedIndex ] = React.useState(-1)

  React.useEffect(
    function onDisable (): void {
      if (props.disabled) {
        setOpen(false)
      }
    }, [ props.disabled ]
  )

  React.useEffect(
    function initActiveIndex (): void {
      let index = props.values
        .indexOf(props.value)

      if (
        index === -1 &&
        props.values.length > 0 &&
        open
      ) {
        index = 0
      }

      setActiveIndex(index)
      setSelectedIndex(index)
    }, [ open, props ]
  )

  const inputRef = React.useRef<HTMLInputElement>(null)

  const toggleDropdown = React.useCallback<React.ReactEventHandler>(
    // eslint-disable-next-line perf-standard/check-function-inline
    function toggleDropdown (event): void {
      event.stopPropagation()
      event.preventDefault()

      if (props.disabled) {
        return
      }

      setOpen(function setOpen (open): boolean {
        if (!open) {
          let index = props.values
            .indexOf(props.value)

          if (index === -1 && props.values.length > 0) {
            index = 0
          }

          setActiveIndex(index)
          setSelectedIndex(index)
        }

        return !open
      })

      if (inputRef.current !== null) {
        inputRef.current.focus()
      }
    }, [ props ]
  )

  const selectOption = React.useCallback(
    function onSelect (index: number): void {
      setActiveIndex(index)
      setSelectedIndex(index)

      props.onClick(index)
    }, [ props ]
  )

  const changeInput = React.useCallback<React.ChangeEventHandler<HTMLInputElement>>(
    function changeInput ({ target: { value } }): void {
      const notEmpty = value !== ''

      setOpen(function setOpen (open): boolean {
        if (open !== notEmpty) {
          setActiveIndex(0)
          setSelectedIndex(0)
          return notEmpty
        }

        return open
      })

      props.onChange(value)
    }, [ props ]
  )

  // Navigation by keys
  const onKeyDown = React.useCallback<React.KeyboardEventHandler>(
    function onKeyDown (event): void {
      if (props.disabled) {
        return
      }

      switch (event.key) {
        case 'Enter':
        case 'Escape':
        case 'ArrowUp':
        case 'ArrowDown':
          event.stopPropagation()
          event.preventDefault()
          break
        default:
          break
      }

      switch (event.key) {
        case 'Enter':
          setOpen(function setOpen (open): boolean {
            if (open) {
              setActiveIndex(function setActiveIndex (index): number {
                if (index !== -1) {
                  selectOption(index)
                }
                return index
              })
            }

            return !open
          })
          break

        case 'Escape':
          setOpen(function setOpen (open): boolean {
            if (!open) {
              props.onChange('')
            }

            return false
          })
          break

        case 'ArrowUp':
          setOpen(function setOpen (open): boolean {
            if (open) {
              setActiveIndex(function setActiveIndex (index): number {
                return (index - 1 + props.values.length) % props.values.length
              })
            } else {
              setActiveIndex(props.values.length - 1)
            }

            return true
          })
          break

        case 'ArrowDown':
          setOpen(function setOpen (open): boolean {
            if (open) {
              setActiveIndex(function setActiveIndex (index): number {
                return (index + 1) % props.values.length
              })
            } else {
              setActiveIndex(0)
            }

            return true
          })
          break

        default:
          break
      }
    }, [ selectOption, props ]
  )

  const onKeyDownOption = React.useCallback<React.ReactEventHandler>(
    (): void => {}, []
  )

  const ref = React.useRef<HTMLDivElement>(null)

  const onBlur = React.useCallback<React.FocusEventHandler>(
    function onBlur (event): void {
      if (
        ref.current !== null &&
        !ref.current.contains(event.relatedTarget as Element)
      ) {
        event.stopPropagation()
        event.preventDefault()

        setOpen(false)
        setActiveIndex(function setActiveIndex (index): number {
          props.onBlur(index, props.values[index] || props.value)
          return index
        })
      }
    }, [ props ]
  )

  return (
    <div
      ref={ref}
      className={
        classnames(
          combobox.box,
          utility.normal,
          utility.pr
        )
      }
      onBlur={onBlur}
    >
      <div
        role='combobox'
        tabIndex={-1}
        aria-haspopup='listbox'
        aria-expanded={open}
        aria-labelledby={`${props.id}-label`}
        aria-controls={`${props.id}-owned_listbox`}
        aria-owns={`${props.id}-owned_listbox`}
        className={
          classnames(
            combobox.combo,
            utility.cp, {
              [combobox.expanded]: open
            }
          )
        }
        onClick={toggleDropdown}
        onKeyDown={onKeyDown}
      >
        <input
          ref={inputRef}
          id={props.id}
          name={props.name}
          type={props.type}
          placeholder={props.placeholder}

          value={props.value}

          autoCapitalize={props.autoCapitalize}
          autoComplete={props.autoComplete}
          autoCorrect={props.autoCorrect}

          aria-autocomplete='list'
          aria-invalid={props.invalid}
          aria-labelledby={`${props.id}-label`}
          aria-describedby={`${props.id}-desc`}
          aria-controls={`${props.id}-owned_listbox`}
          aria-activedescendant={
            activeIndex !== -1
              ? `${props.id}-option-${activeIndex}`
              : undefined
          }

          className={
            classnames(
              combobox.input,
              utility.full,
              utility.cp, {
                [combobox.inputExpanded]: open,
                [props.invalidClassName]: props.invalid,
                [props.validClassName]: props.valid
              }
            )
          }

          disabled={props.disabled}
          required={props.required}
          readOnly={props.readOnly}

          onChange={changeInput}
        />

        <div
          role='button'
          tabIndex={-1}
          className={
            classnames(
              combobox.dropdown,
              utility.pa, {
                [combobox.dropdownExpanded]: open
              }
            )
          }
        >
          <div
            role='img'
            aria-hidden
            className={
              classnames(
                combobox.dropdownIcon,
                utility.pen
              )
            }
          >
            {
              open
                ? (<SvgMoveUp />)
                : (<SvgMoveDown />)
            }
          </div>
        </div>
      </div>

      <ul
        role='listbox'
        tabIndex={-1}
        id={`${props.id}-owned_listbox`}
        className={
          classnames(
            combobox.dropdownList,
            utility.pr,
            utility.full,
            utility.zi1,
            utility.lsn, {
              [utility.dn]: !open
            }
          )
        }
      >
        {
          props.values.map(function mapper (value, index): JSX.Element {
            return (
              <OptionCombobox
                key={value}
                index={index}
                id={props.id}
                value={value}
                active={open && index === activeIndex}
                selected={open && index === selectedIndex}
                onClick={selectOption}
                onKeyDown={onKeyDownOption}
              />
            )
          })
        }
      </ul>
    </div>
  )
}

export default React.memo(InputCombobox)
