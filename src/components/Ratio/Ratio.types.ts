import { StyleProp, ViewStyle } from 'react-native'
import { FontSizeType, IconSizeType } from 'themes'

export type Props = {
  active: boolean
  number?: number
  size?: IconSizeType
  fontSize?: FontSizeType
  style?: StyleProp<ViewStyle>
}
