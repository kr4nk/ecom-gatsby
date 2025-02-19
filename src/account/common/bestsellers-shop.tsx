import * as React from 'react'
import { List } from 'immutable'

import { isBrowser } from '../../utils/isbrowser'

import Spinner from '../../components/common/spinner'

import SvgAngleLeft from '../../components/svg/angle-left'
import SvgAngleRight from '../../components/svg/angle-right'

import Bestseller from '../shop/bestseller-shop'
import ButtonIndicator from './button-indicator'

import * as layout from '../../styles/layout.module.css'
import * as carousel from '../../styles/carousel.module.css'

import { TProduct } from '../../types/account'

import {
  ID,
  NAME
} from '../../redux/selector-consts'

interface StateProps {
  isFetching: boolean;
  products: List<TProduct>;
}

type SideEffect = () => void;

export default function BestsellersShop (props: StateProps): JSX.Element {
  const interval = React.useRef(0)

  const [ current, setCurrent ] = React.useState(0)

  const freeInterval = React.useCallback(
    function freeIntervalCallback (): void {
      if (interval.current !== 0) {
        window.clearInterval(interval.current)
        interval.current = 0
      }
    }, []
  )

  const nextItem = React.useCallback(
    function nextItem (): void {
      setCurrent(function setCurrent (value): number {
        return (value + 1) % props.products.size || 0
      })
    }, [ props.products.size ]
  )

  const resetInterval = React.useCallback(
    function resetIntervalCallback (): void {
      if (isBrowser) {
        if (interval.current !== 0) {
          window.clearInterval(interval.current)
        }

        interval.current = window.setInterval(
          nextItem,
          5000
        )
      }
    }, [ nextItem ]
  )

  React.useEffect(
    function resetIntervalEffect (): SideEffect {
      if (isBrowser) {
        if (document.hasFocus()) {
          resetInterval()
        }

        window.addEventListener('focus', resetInterval)
        window.addEventListener('blur', freeInterval)

        return function cleanup (): void {
          window.removeEventListener('focus', resetInterval)
          window.removeEventListener('blur', freeInterval)

          freeInterval()
        }
      }

      return function callback (): void {}
    }, [ resetInterval, freeInterval ]
  )

  const carouselLeft = React.useCallback<React.ReactEventHandler>(
    function carouselCallback (event): void {
      event.stopPropagation()

      setCurrent(function setCurrent (value): number {
        return (value - 1 + props.products.size) % props.products.size || 0
      })

      resetInterval()
    }, [ resetInterval, props.products.size ]
  )

  const carouselRight = React.useCallback<React.MouseEventHandler>(
    function carouselEventHandler (event): void {
      event.stopPropagation()

      nextItem()

      resetInterval()
    }, [ resetInterval, nextItem ]
  )

  const [ focus, setFocus ] = React.useState(false)

  const indicatorClick = React.useCallback(
    function indicatorClick (index: number): void {
      setCurrent(index)

      resetInterval()
    }, [ resetInterval ]
  )

  const indicatorKeyDown = React.useCallback<React.KeyboardEventHandler>(
    // eslint-disable-next-line perf-standard/check-function-inline
    function indicatorKeyDown (event): void {
      switch (event.key) {
        case 'ArrowUp':
        case 'ArrowLeft':
          event.preventDefault()

          setFocus(true)
          setCurrent(function setCurrent (value): number {
            return (value - 1 + props.products.size) % props.products.size || 0
          })
          break

        case 'ArrowDown':
        case 'ArrowRight':
          event.preventDefault()

          setFocus(true)
          setCurrent(function setCurrent (value): number {
            return (value + 1) % props.products.size || 0
          })
          break

        default:
          return
      }

      resetInterval()
    }, [ resetInterval, props.products.size ]
  )

  const onFocus = React.useCallback<React.FocusEventHandler>(
    function onFocus (): void {
      setFocus(true)
    }, []
  )

  const onBlur = React.useCallback<React.FocusEventHandler>(
    function onBlur (event): void {
      if (!event.target.contains(event.relatedTarget as Element)) {
        setFocus(false)
      }
    }, []
  )

  return (
    <section className={layout.section}>
      <h2 className={layout.pageTitle}>
        Shop
      </h2>

      <div className={carousel.carousel}>
        {
          props.isFetching
            ? <Spinner />
            : (
              <div>
                <ul>
                  {
                    props.products.slice(current, current + 1).map(function mapper (product): JSX.Element {
                      return (
                        <Bestseller
                          key={product.get(ID)}
                          product={product}
                        />
                      )
                    })
                  }
                </ul>
              </div>
            )
        }

        <div>
          <button
            aria-label='Previos bestseller'
            className={carousel.buttonCarouselLeft}
            onClick={carouselLeft}
            type='button'
          >
            <div
              role='img'
              aria-hidden
              className={carousel.icon}
            >
              <SvgAngleLeft />
            </div>
          </button>

          <button
            aria-label='Next bestseller'
            className={carousel.buttonCarouselRight}
            onClick={carouselRight}
            type='button'
          >
            <div
              role='img'
              aria-hidden
              className={carousel.icon}
            >
              <SvgAngleRight />
            </div>
          </button>
        </div>

        <div
          role='radiogroup'
          className={carousel.carouselIndicators}
          onFocus={onFocus}
          onBlur={onBlur}
        >
          {
            props.products.map(function mapper (product, index): JSX.Element {
              return (
                <ButtonIndicator
                  key={product.get(ID)}
                  index={index}
                  label={product.get(NAME)}
                  focus={focus}
                  active={index === current}
                  onKeyDown={indicatorKeyDown}
                  onClick={indicatorClick}
                />
              )
            })
          }
        </div>
      </div>
    </section>
  )
}
