export const SECOND_IN_MS = 1000
export const MINUTE_IN_SECONDS = 60
export const MINUTE_IN_MS = MINUTE_IN_SECONDS * SECOND_IN_MS

export const getFormatedTime = (ms: number): string => {
  const fullSeconds = Math.floor(ms / SECOND_IN_MS)
  const minutes = Math.floor(fullSeconds / MINUTE_IN_SECONDS)
  const seconds = fullSeconds - minutes * MINUTE_IN_SECONDS

  let secondsString = seconds.toString()
  let minutesString = minutes.toString()

  if (secondsString.length === 1) {
    secondsString = '0' + secondsString
  }
  if (minutesString.length === 1) {
    minutesString = '0' + minutesString
  }

  return `${minutesString}:${secondsString}`
}
