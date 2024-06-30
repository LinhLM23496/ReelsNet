import { ImageType } from 'hooks/useGallery'

export type Props = {
  isMultiple: boolean
  currentSelect: ImageType
  changeCurrentSelect: (item: ImageType) => void
}

export type BSMediaRef = {
  getSelected: () => ImageType[]
}
