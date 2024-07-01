import { StyleProp, ViewStyle } from 'react-native'

export type Props = {
  time?: number
  size?: number
  onDone?: () => void
  color?: string
  colorBackground?: string
  style?: StyleProp<ViewStyle>
}
