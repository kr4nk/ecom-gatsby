export function roundToTwo (num: number): number {
  return +(Math.round(parseFloat(num + 'e+2')) + 'e-2')
}

export function roundTo (num: number, size: number): number {
  return +(Math.round(parseFloat(num + ('e+' + size))) + ('e-' + size))
}

export function clamp (value: number, min: number, max: number): number {
  if (value < min) {
    return min
  }

  if (value > max) {
    return max
  }

  return value || min
}

export function scrollToEnd (fullSize: number, pageSize: number): number {
  return Math.max(fullSize - pageSize + fullSize % pageSize, 0)
}

export function scrollToBack (current: number, pageSize: number): number {
  return Math.max(current - pageSize, 0)
}

export function scrollToNext (current: number, fullSize: number, pageSize: number): number {
  return clamp(
    current + pageSize,
    0,
    scrollToEnd(fullSize, pageSize)
  )
}
