import { MediaType } from 'hooks/useGallery'

export type CameraRef = {
  present: () => void
  close: () => void
  clear: () => void
}

export type Props = {
  onDone: (photo: MediaType) => void
  onClose?: () => void
}
