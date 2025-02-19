import { isBrowser } from './isbrowser'

function observerCallback (entries: IntersectionObserverEntry[], observer: IntersectionObserver): void {
  for (const entry of entries) {
    if (entry.intersectionRatio > 0) {
      observer.unobserve(entry.target)

      entry.target.dispatchEvent(
        new CustomEvent('lazyImage', {
          detail: entry
        })
      )
    }
  }
}

export const observer = isBrowser
  ? new IntersectionObserver(observerCallback, { rootMargin: '300px 0px' })
  : undefined
