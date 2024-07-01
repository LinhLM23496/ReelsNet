import { IButtonProps } from 'components/Button/Button.types'
import { PositionModal } from 'components/Modal/Modal.types'

export type ModalProps = {
  display: boolean
  position?: PositionModal
  title?: string
  subTitle?: string
  content?: string
  button?: IButtonProps[]
  autoClose?: boolean
  onClose?: () => void
}

export type ModalState = {
  modal: ModalProps
  setModal: (data: ModalProps) => void
  closeModal: () => void
}
