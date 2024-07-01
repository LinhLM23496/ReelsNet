import { createSlice } from '@reduxjs/toolkit'
import { ModalProps } from './modal.types'

const initialState: ModalProps = {
  display: false,
  autoClose: false,
  button: [],
  image: undefined,
  content: '',
  title: '',
  subTitle: '',
  onClose: () => {}
}

export const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    setModal: (state: any, action) => {
      Object.keys(action.payload).forEach((key) => {
        const modalPropKey = key as keyof ModalProps
        state[modalPropKey] = action.payload[modalPropKey]
      })
    },
    closeModal: (state: any) => {
      Object.keys(initialState).forEach((key) => {
        const modalPropKey = key as keyof ModalProps
        state[modalPropKey] = initialState[modalPropKey]
      })
    }
  }
})

export default modalSlice.reducer
