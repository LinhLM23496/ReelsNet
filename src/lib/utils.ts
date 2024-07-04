import { Platform } from 'react-native'

export const isIOS = Platform.OS === 'ios'

export function convertNumberToShortNumber(count: number) {
  const COUNT_ABBRS = ['', 'K', 'M', 'B']
  if (count === 0) return '0'

  const i = Math.floor(Math.log(count) / Math.log(1000))
  const number = count / Math.pow(1000, i)

  // Check if the number is an integer
  const numberString = number % 1 === 0 ? number.toFixed(0) : number.toFixed(2)

  return `${numberString}${COUNT_ABBRS[i]}`
}

export function generateRandomString(): string {
  const length = 3
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
  let result = ''
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length))
  }
  return result
}

export function formatTime(seconds: number) {
  seconds = Math.round(seconds)
  // Make sure seconds is a positive integer
  seconds = Math.max(0, seconds)

  let hours = Math.floor(seconds / 3600)
  let minutes = Math.floor((seconds % 3600) / 60)
  let secs = seconds % 60

  const pad = (num: number) => (num < 10 ? '0' + num : num)

  if (hours > 0) {
    return `${pad(hours)}:${pad(minutes)}:${pad(secs)}`
  } else if (minutes > 0) {
    return `${pad(minutes)}:${pad(secs)}`
  } else {
    return `00:${pad(secs)}`
  }
}
