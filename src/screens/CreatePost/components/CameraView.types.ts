import { ImageType } from 'hooks/useGallery'

export type CameraRef = {
  present: () => void
  close: () => void
  clear: () => void
}

export type Props = {
  onDone: (photo: ImageType) => void
  onClose?: () => void
}
