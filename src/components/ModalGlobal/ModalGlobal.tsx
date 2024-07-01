import React from 'react'
import { Button, Icon, Modal, Row, Text } from 'components'
import { useDispatch, useSelector } from 'react-redux'
import { selectModal } from 'stores/modal/modal.selectors'
import { styles } from './ModalGlobal.styles'
import { color, colorRange } from 'themes'
import { Image, View } from 'react-native'
import { closeModal } from 'stores/modal/modal.action'

const ModalGobal = () => {
  const dispatch = useDispatch()
  const modal = useSelector(selectModal)
  const {
    display,
    position,
    title,
    subTitle,
    image,
    content,
    button,
    autoClose,
    onClose
  } = modal ?? {}
  const borderRadius = image?.border ?? 100

  const handleButton = (onPress?: () => void) => {
    dispatch<any>(closeModal())
    onPress?.()
  }

  const handleClose = () => {
    dispatch<any>(closeModal())
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
      {image ? (
        <View style={styles.containerImage}>
          <Image
            source={{ uri: image.uri }}
            style={[styles.image, { borderRadius }]}
          />
          {image?.isVerify ? (
            <Icon name="check" color={color.success} style={styles.iconCheck} />
          ) : null}
        </View>
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
