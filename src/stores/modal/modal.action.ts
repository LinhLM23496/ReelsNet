import { modalSlice } from './modal.reducer'
import { ModalProps } from './modal.types'

const { setModal, closeModal: closeModalReducer } = modalSlice.actions

export const onModal = (props: ModalProps) => (dispatch: any) => {
  dispatch(setModal(props))
}

export const closeModal = () => (dispatch: any) => {
  dispatch(closeModalReducer())
}
