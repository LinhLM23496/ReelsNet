import { MediaType } from 'hooks/useGallery'
import { Ref } from 'react'
import { ImageItemRef } from './components/ImageItem.types'

export type FilterType = {
  id: string
  matrix: any
  title: string
}

export type ImageFilterType = MediaType & {
  ref: Ref<ImageItemRef>
}
