import React from 'react'
import { Button, Modal, Row, Text } from 'components'
import { useDispatch, useSelector } from 'react-redux'
import { selectModal } from 'stores/modal/modal.selectors'
import { closeModal } from 'stores/modal/modal.reducer'
import { styles } from './ModalGlobal.styles'
import { colorRange } from 'themes'

const ModalGobal = () => {
  const dispatch = useDispatch()
  const modal = useSelector(selectModal)
  const {
    display,
    position,
    title,
    subTitle,
    content,
    button,
    autoClose,
    onClose
  } = modal ?? {}

  const handleButton = (onPress?: () => void) => {
    closeModal()
    onPress?.()
  }

  const handleClose = () => {
    dispatch(closeModal())
    onClose?.()
  }

  if (!display) return null

  return (
    <Modal
      visible={display}
      setModalVisible={handleClose}
      onClose={handleClose}
      position={position}
      autoClose={autoClose}>
      {title ? (
        <Text
          size="xl"
          numberOfLines={1}
          adjustsFontSizeToFit
          fontWeight="bold"
          style={styles.title}>
          {title}
        </Text>
      ) : null}
      {subTitle ? (
        <Text size="l" fontWeight="500">
          {subTitle}
        </Text>
      ) : null}
      {content ? <Text color={colorRange.gray[400]}>{content}</Text> : null}
      {button?.length ? (
        <Row
          justifyContent="space-between"
          gap={'m'}
          style={styles.buttonContainer}>
          {button?.map((item, index: number) => (
            <Button
              key={index}
              title={item.title}
              onPress={() => handleButton(item?.onPress)}
              style={styles.button}
            />
          ))}
        </Row>
      ) : null}
    </Modal>
  )
}

export default ModalGobal
