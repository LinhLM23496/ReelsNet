export type PositionModal = 'top' | 'center' | 'bottom' | undefined

export type Props = {
  visible: boolean
  setModalVisible: (value: boolean) => void
  onClose?: () => void
  children?: React.ReactNode
  position?: PositionModal
  duration?: number
  autoClose?: boolean
}

export type PositionType = {
  justifyContent: 'flex-start' | 'center' | 'flex-end'
  value: number
}
