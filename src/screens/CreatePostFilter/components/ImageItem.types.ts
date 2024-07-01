import { ImageType } from 'hooks/useGallery'

export type Props = {
  data: ImageType
  onDelete: () => void
  matrix: any
  isDelete: boolean
}

export type ImageItemRef = {
  capture: () => Promise<ImageType>
}
