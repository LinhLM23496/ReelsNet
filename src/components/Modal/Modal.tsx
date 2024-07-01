import React, { useEffect, useMemo } from 'react'
import { TouchableWithoutFeedback } from 'react-native'
import { View, Modal as ModalRN } from 'react-native'
import Animated, {
  interpolate,
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming
} from 'react-native-reanimated'
import { color } from 'themes'
import { PositionType, Props } from './Modal.types'
import ProgressBar from './components/ProgressBar'
import Button from 'components/Button/Button'
import { styles } from './Modal.styles'

const Modal = (props: Props) => {
  const {
    visible,
    setModalVisible,
    onClose,
    children,
    position = 'center',
    duration = 750,
    autoClose = false
  } = props
  const overlayValue = useSharedValue(color.white)

  const positionValue: PositionType = useMemo(() => {
    switch (position) {
      case 'top':
        return { justifyContent: 'flex-start', value: -400 }
      case 'bottom':
        return { justifyContent: 'flex-end', value: 400 }
      default:
        return { justifyContent: 'center', value: 0 }
    }
  }, [position])

  const visibleValue = useSharedValue(positionValue.value)

  useEffect(() => {
    visibleValue.value = interpolate(
      visible ? 1 : 0,
      [0, 1],
      [positionValue.value, positionValue.value === 0 ? 1 : 0]
    )
    overlayValue.value = interpolateColor(
      visible ? 1 : 0,
      [0, 1],
      [color.white, 'rgba(0,0,0,0.1)']
    )
  }, [visible])

  const modalStyle = useAnimatedStyle(() => {
    if (position === 'center') {
      return {
        transform: [{ scale: withSpring(visibleValue.value) }]
      }
    }
    const translateY = withSpring(visibleValue.value, { duration: 2000 })
    return { transform: [{ translateY }] }
  })

  const overlayStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: withTiming(overlayValue.value, { duration })
    }
  })

  const handleClose = () => {
    setModalVisible(false)
    onClose?.()
  }
  return (
    <ModalRN
      transparent={true}
      statusBarTranslucent={true}
      visible={visible}
      onRequestClose={handleClose}>
      <TouchableWithoutFeedback onPress={handleClose}>
        <Animated.View style={[styles.modalOverlay, overlayStyle]} />
      </TouchableWithoutFeedback>
      <View
        style={[
          styles.container,
          { justifyContent: positionValue.justifyContent }
        ]}>
        <Animated.View style={[styles.modalView, modalStyle]}>
          <Button
            variant="ghost"
            spacing="xxs"
            onPress={handleClose}
            style={styles.buttonClose}
            iconName="close"
          />
          {children}
          {autoClose ? (
            <ProgressBar onDone={handleClose} style={styles.progressBar} />
          ) : null}
        </Animated.View>
      </View>
    </ModalRN>
  )
}

export default Modal
