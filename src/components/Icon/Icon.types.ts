import { IconSizeType } from 'themes'
import { IconComponent } from './Icon'

export type Props = {
  name: keyof typeof IconComponent
  size?: IconSizeType
  color?: string
}
