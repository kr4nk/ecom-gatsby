import * as React from 'react'
import classnames from 'classnames'

import SvgMoveDown from '../svg/move-down'
import SvgMoveUp from '../svg/move-up'

import OptionSelect from './option-select'

import * as combobox from '../../styles/combobox.module.css'
import * as utility from '../../styles/utility.module.css'

import { OnOff } from '../../types/common'

interface OwnProps {
  id: string;
  name?: string;
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
  onChange?: React.ChangeEventHandler;
  onClick (index: number): void;
  onBlur (index: number, value: string): void;
  onFocus: React.FocusEventHandler;
}

function InputSelect (props: OwnProps): JSX.Element {
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

  const listRef = React.useRef<HTMLUListElement>(null)
  const buttonRef = React.useRef<HTMLButtonElement>(null)

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

      if (open && listRef.current !== null) {
        listRef.current.focus()
      }

      setActiveIndex(index)
      setSelectedIndex(index)
    }, [ open, props ]
  )

  const toggleDropdown = React.useCallback<React.MouseEventHandler>(
    function toggleDropdown (event): void {
      event.stopPropagation()
      event.preventDefault()

      setOpen(function setOpen (open): boolean {
        return !open
      })
    }, []
  )

  const selectOption = React.useCallback(
    function onSelect (index: number): void {
      if (buttonRef.current !== null) {
        buttonRef.current.focus()
      }

      props.onClick(index)
      setOpen(false)
    }, [ props ]
  )

  const onKeyDown = React.useCallback<React.KeyboardEventHandler>(
    function onKeyDown (event): void {
      event.stopPropagation()

      switch (event.key) {
        case 'Enter':
        case ' ':
        case 'End':
        case 'Home':
        case 'ArrowUp':
        case 'ArrowDown':
          event.preventDefault()
          break
        default:
          break
      }

      switch (event.key) {
        case 'Enter':
        case ' ':
          setOpen(function setOpen (open): boolean {
            if (open) {
              setActiveIndex(function setActiveIndex (index): number {
                if (index !== -1) {
                  selectOption(index)
                }
                return index
              })
            }

            return true
          })
          break

        case 'Escape':
          setOpen(false)
          break

        case 'End':
          setOpen(function setOpen (open): boolean {
            if (open) {
              setActiveIndex(props.values.length - 1)
            }

            return open
          })
          break

        case 'Home':
          setOpen(function setOpen (open): boolean {
            if (open) {
              setActiveIndex(0)
            }

            return open
          })
          break

        case 'ArrowUp':
          setOpen(function setOpen (open): boolean {
            if (open) {
              setActiveIndex(function setActiveIndex (index): number {
                return (index - 1 + props.values.length) % props.values.length
              })
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
            }

            return true
          })
          break

        default:
          break
      }
    }, [ selectOption, props.values.length ]
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
      <button
        ref={buttonRef}
        type='button'
        aria-haspopup='listbox'
        aria-labelledby={`${props.id}-label`}
        aria-describedby={`${props.id}-desc`}
        aria-expanded={open}
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
          id={props.id}
          name={props.name}
          type='text'
          tabIndex={-1}
          autoCorrect={props.autoCorrect}
          autoComplete={props.autoComplete}
          autoCapitalize={props.autoCapitalize}
          className={
            classnames(
              combobox.input,
              utility.full,
              utility.cp, {
                [combobox.fieldExpanded]: open,
                [props.invalidClassName]: props.invalid,
                [props.validClassName]: props.valid
              }
            )
          }
          value={props.value}
          placeholder={props.placeholder}
          disabled={props.disabled}
          required={props.required}
          readOnly={props.readOnly}
          onChange={props.onChange}
          onFocus={props.onFocus}
        />

        <div
          role='button'
          className={
            classnames(
              combobox.dropdown,
              utility.pen,
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
      </button>

      <ul
        ref={listRef}
        role='listbox'
        tabIndex={0}
        id={`${props.id}-owned_listbox`}
        aria-activedescendant={
          activeIndex !== -1
            ? `${props.id}-option-${activeIndex}`
            : undefined
        }
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
        onKeyDown={onKeyDown}
      >
        {
          props.values.map(function mapper (value, index): JSX.Element {
            return (
              <OptionSelect
                key={value}
                index={index}
                id={props.id}
                value={value}
                active={open && index === activeIndex}
                selected={open && index === selectedIndex}
                onClick={selectOption}
                onKeyDown={onKeyDown}
              />
            )
          })
        }
      </ul>
    </div>
  )
}

export default React.memo(InputSelect)
