import { ReactNode } from 'react'
import {
  GestureResponderEvent,
  StyleProp,
  TextStyle,
  ViewStyle
} from 'react-native'
import { FontSizeType } from 'themes'

export type NavigationBarProps = {
  style?: StyleProp<ViewStyle>
  onBackPress?: (event: GestureResponderEvent) => void
  title?: string | Function
  onPressTitle?: () => void
  subTitle?: string
  subTitleStyle?: StyleProp<TextStyle>
  ElementLeft?: ReactNode
  ElementRight?: ReactNode
  buttonStyle?: StyleProp<ViewStyle>
  hideBack?: boolean
  titleStyle?: StyleProp<TextStyle>
  numberOfLines?: number
  backgroundColor?: string
  isModal?: boolean
  fontSize?: FontSizeType
  adjustsFontSizeToFit?: boolean
  absolute?: boolean
  [key: string]: any
}
