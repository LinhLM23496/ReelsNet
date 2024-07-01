import { IconComponent } from 'components/Icon/Icon'
import { ReactNode } from 'react'
import {
  StyleProp,
  TextStyle,
  TouchableOpacityProps,
  ViewStyle
} from 'react-native'
import { FontSizeType, IconSizeType, SpaceSizeType } from 'themes'

type ButtonVariantType = 'outline' | 'ghost' | 'filled'

export interface IButtonProps extends TouchableOpacityProps {
  variant?: ButtonVariantType
  onPress: () => void
  title?: string
  iconName?: keyof typeof IconComponent
  iconSize?: IconSizeType
  iconColor?: string
  style?: StyleProp<ViewStyle>
  styleContent?: StyleProp<TextStyle>
  loading?: boolean
  ElementLeft?: ReactNode
  ElementRight?: ReactNode
  spacing?: SpaceSizeType
  borderRadius?: SpaceSizeType
  isFullWidth?: boolean
  colorText?: string
  /**
   * fontSize
   ** xxs => fontsize is 8
   ** xs => fontsize is 10
   ** s => fontsize is 12
   ** m => fontsize is 14
   ** l => fontsize is 16
   ** xl => fontsize is 24
   ** xxl => fontsize is 28
   ** 3xl => fontsize is 32
   ** 4xl => fontsize is 40
   */
  fontSize?: FontSizeType
  backgroundColor?: string
}
