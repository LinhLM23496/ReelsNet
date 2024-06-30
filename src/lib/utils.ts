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
