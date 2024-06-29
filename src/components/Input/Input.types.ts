import { IconComponent } from 'components/Icon/Icon'
import { ReactNode } from 'react'
import { StyleProp, TextInputProps, TextStyle, ViewStyle } from 'react-native'
import { TextProps } from 'react-native'
import { IconSizeType } from 'themes'

export type InputRef = {
  clear: () => void
}

export type InputProps = TextInputProps & {
  label?: string
  iconName?: keyof typeof IconComponent
  labelProps?: TextProps
  labelStyle?: StyleProp<TextStyle>
  contentStyle?: ViewStyle
  style?: ViewStyle
  inputStyle?: ViewStyle
  iconColor?: string
  iconSize?: IconSizeType
  ElementRight?: ReactNode
  ElementLeft?: ReactNode
  showClear?: boolean
  onClear?: () => void
  maxLength?: number
  onPressIcon?: () => void
}
