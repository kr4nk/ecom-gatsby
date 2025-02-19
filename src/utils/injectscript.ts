import { isBrowser } from './isbrowser'

interface InjectScriptOptions {
  url: string;
  id: string;
}

// eslint-disable-next-line perf-standard/check-function-inline
export function injectScript ({ url, id }: InjectScriptOptions): Promise<string> {
  if (!isBrowser) {
    return Promise.reject(
      new Error('document is undefined')
    )
  }

  return new Promise(function promiseCallback (resolve, reject): void {
    if (document.getElementById(id) !== null) {
      return resolve(id)
    }

    const script = document.createElement('script')

    script.type = 'text/javascript'
    script.src = url
    script.id = id
    script.async = true
    script.onload = function onload (): void {
      resolve(id)
    }
    script.onerror = reject
    document.head.appendChild(script)
  })
}
