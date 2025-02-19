import { TDangerHTML } from '../types/common'

function markText (str: string): string {
  return `<mark>${str}</mark>`
}

export default function searchAndMarkText (text: string, search: RegExp): TDangerHTML {
  return {
    __html: search.test(text)
      ? text.replace(search, markText)
      : text
  }
}
