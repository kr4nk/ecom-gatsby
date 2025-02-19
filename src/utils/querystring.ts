interface QueryString {
  [key: string]: string;
}

export function querystring (obj: QueryString, sep = '&', eq = '='): string {
  const str = Object.entries<string>(obj).reduce(function reducer (acc, [key, value]): string {
    if (value !== undefined && value !== null) {
      return acc + sep + encodeURIComponent(key) + eq + encodeURIComponent(value)
    }

    return acc
  }, '')

  return str.length > 0
    ? '?' + str.substr(1)
    : str
}
