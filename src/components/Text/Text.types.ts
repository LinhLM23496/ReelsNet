import { StyleProp, TextProps, TextStyle } from 'react-native'
import { FontSizeType } from 'themes'

export type FontWeight =
  | 'normal'
  | 'bold'
  | '100'
  | '200'
  | '300'
  | '400'
  | '500'
  | '600'
  | '700'
  | '800'
  | '900'

export type TextPropsType = TextProps & {
  fontWeight?: FontWeight
  color?: string
  style?: StyleProp<TextStyle>
  textAlign?: 'auto' | 'left' | 'right' | 'center' | 'justify'
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
  size?: FontSizeType
}
