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

export type JustifyContentType = 'flex-start' | 'center' | 'flex-end'

export type PositionType = {
  justifyContent: JustifyContentType
  value: number
  marginTop: number
  marginBottom: number
}
