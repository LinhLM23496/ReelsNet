import { MediaType } from 'hooks/useGallery'

export type Props = {
  data: MediaType
  onDelete: () => void
  matrix: any
  isDelete: boolean
}

export type ImageItemRef = {
  capture: () => Promise<MediaType>
}
