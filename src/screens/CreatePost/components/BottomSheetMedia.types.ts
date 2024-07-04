import { MediaType } from 'hooks/useGallery'

export type Props = {
  isMultiple: boolean
  currentSelect: MediaType
  changeCurrentSelect: (item: MediaType) => void
}

export type BSMediaRef = {
  getSelected: () => MediaType[]
  updateSelected: (position: MediaType) => void
  refresh: () => void
}
