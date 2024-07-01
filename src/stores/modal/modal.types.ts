import { IButtonProps } from 'components/Button/Button.types'
import { PositionModal } from 'components/Modal/Modal.types'

export type ModalProps = {
  display: boolean
  position?: PositionModal
  title?: string
  image?: avatarType // uri
  subTitle?: string
  content?: string
  button?: IButtonProps[]
  autoClose?: boolean
  onClose?: () => void
}

type avatarType = {
  uri: string
  border?: number
  isVerify?: boolean
}

export type ModalState = {
  modal: ModalProps
  setModal: (data: ModalProps) => void
  closeModal: () => void
}
