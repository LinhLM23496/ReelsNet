import { setModal } from './modal.reducer'
import { ModalProps } from './modal.types'

export const onModal = (props: ModalProps) => (dispatch: any) => {
  dispatch(setModal(props))
}
