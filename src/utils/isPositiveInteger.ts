export const isPositiveInteger = (string: string) => {
  const number = Number(string)
  const isInteger = Number.isInteger(number)
  const isPositive = number > 0

  return isInteger && isPositive
}
