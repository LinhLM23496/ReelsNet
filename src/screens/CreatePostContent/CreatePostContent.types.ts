import { IconComponent } from 'components/Icon/Icon'
import { ImageType } from 'hooks/useGallery'

export type PostParams = {
  media: ImageType[]
  content: string
  location?: {
    latitude: number
    longitude: number
  }
  tagUsers?: string[]
  tagAI: boolean
  shareFacebook: boolean
  music: ImageType
  showLike: boolean
  showShare: boolean
  isComment: boolean
}

export type DataType = {
  id: string
  name: keyof PostParams
  title?: string
  icon?: keyof typeof IconComponent
  variant: 'navigation' | 'function' | 'toggle' | 'input'
  action?: any
  subTitle?: string
}
