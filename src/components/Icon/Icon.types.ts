import { IconSizeType } from 'themes'
import { IconComponent } from './Icon'
import { StyleProp, ViewStyle } from 'react-native'

export type Props = {
  name: keyof typeof IconComponent
  size?: IconSizeType
  color?: string
  style?: StyleProp<ViewStyle>
}
