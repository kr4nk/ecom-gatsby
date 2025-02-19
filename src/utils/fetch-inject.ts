declare interface Resource {
  text: string;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function head (type: string, resource: Resource, resolve: any): void {
  const element = document.createElement(type)
  const first: Element = document.getElementsByTagName(type)[0]

  element.appendChild(document.createTextNode(resource.text))
  element.onload = resolve(resource)

  if (first !== null && first !== undefined) {
    if (first.parentNode !== null) {
      first.parentNode.insertBefore(element, first)
    }
  } else {
    document.head.appendChild(element)
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function fetchInject (inputs: string[]): any {
  const resources: { text: string; blob: { type: string } }[] = []
  const deferreds: Promise<void>[] = []
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const thenables: { then: (resolve: any) => void }[] = []

  inputs.forEach(function forEach (input): void {
    deferreds.push(
      fetch(input)
        .then(function getList (res): [Promise<string>, Promise<Blob>] {
          const list: [Promise<string>, Promise<Blob>] = [res.clone().text(), res.blob()]
          return list
        })
        .then(function getPromises (promises): Promise<void> {
          return Promise.all(promises)
            .then(function pushResource ([text, blob]): void {
              resources.push({
                text,
                blob
              })
            })
            .catch(function catchError (err: Error): void {
              console.error('Error:', err)
            })
        })
        .catch(function catchError (err: Error): void {
          console.error(`fetchInject ${input} input promise Error`, err)
        })
    )
  })

  return Promise.all(deferreds)
    .then(function success (): void {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      resources.forEach(function forEach (resource): Promise<{ then: (resolve: any) => void}[]> {
        thenables.push({
          then (resolve): void {
            resource.blob.type.includes('text/css')
              ? head('style', resource, resolve)
              : head('script', resource, resolve)
          }
        })

        return Promise.all(thenables)
      })
    })
    .catch(function catchError (error): void {
      console.error('fetchInject resource promise error', error)
    })
}
