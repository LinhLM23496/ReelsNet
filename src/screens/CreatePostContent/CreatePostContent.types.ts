import { IconComponent } from 'components/Icon/Icon'
import { MediaType } from 'hooks/useGallery'

export type PostParams = {
  media: MediaType[]
  content: string
  location?: {
    latitude: number
    longitude: number
  }
  tagUsers?: string[]
  tagAI: boolean
  shareFacebook: boolean
  music: MediaType
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
