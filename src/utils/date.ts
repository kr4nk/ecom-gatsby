export function getCurrentQuarter (): number {
  const month = new Date().getMonth() + 1

  return Math.ceil(month / 3)
}

export function getCurrentYear (): number {
  return new Date().getFullYear()
}
