import { Alert, StyleSheet, TouchableOpacity, View } from 'react-native'
import React, {
  Ref,
  forwardRef,
  useCallback,
  useImperativeHandle,
  useRef,
  useState
} from 'react'
import { Icon, NavigationBar, Row } from 'components'
import {
  Camera,
  CameraProps,
  Point,
  useCameraDevice
} from 'react-native-vision-camera'
import Reanimated, {
  Extrapolation,
  interpolate,
  runOnJS,
  useAnimatedProps,
  useSharedValue
} from 'react-native-reanimated'
import { Gesture, GestureDetector } from 'react-native-gesture-handler'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { CameraRef, Props } from './CameraView.types'
import { styles } from './CameraView.styles'
import { color, space } from 'themes'

Reanimated.addWhitelistedNativeProps({
  zoom: true
})
const ReanimatedCamera = Reanimated.createAnimatedComponent(Camera)

const CameraView = forwardRef((props: Props, ref: Ref<CameraRef>) => {
  const { onDone, onClose } = props
  const { bottom } = useSafeAreaInsets()

  const [activeCamera, setActiveCamera] = useState(false)
  const [flashCamera, setFlashCamera] = useState(false)
  const [deviceCamera, setDeviceCamera] = useState(true)
  const [loadingTakePhoto, setLoadingTakePhoto] = useState(false)
  const device = useCameraDevice(deviceCamera ? 'front' : 'back')
  const camera = useRef<Camera>(null)

  const spaceBottom = bottom + space.m
  const colorFlash = flashCamera ? color.warning : color.black

  // ZOOM CAMERA
  const zoom = useSharedValue(device?.neutralZoom)
  const zoomOffset = useSharedValue(0)
  const gestureZoom = Gesture.Pinch()
    .onBegin(() => {
      zoomOffset.value = zoom.value || 0
    })
    .onUpdate((event) => {
      const z = zoomOffset.value * event.scale
      zoom.value = interpolate(
        z,
        [1, 10],
        [device?.minZoom || 0, device?.maxZoom || 0],
        Extrapolation.CLAMP
      )
    })

  const animatedProps = useAnimatedProps<CameraProps>(
    () => ({ zoom: zoom.value }),
    [zoom]
  )

  // FOCUS CAMERA
  const focus = useCallback(async (point: Point) => {
    const c = camera.current
    if (c == null) return
    await c.focus(point)
  }, [])

  const gestureFocus = Gesture.Tap().onEnd(({ x, y }) => {
    if (!device || !device.supportsFocus) return
    runOnJS(focus)({ x, y })
  })

  const gesture = Gesture.Simultaneous(gestureZoom, gestureFocus)

  useImperativeHandle(ref, () => ({
    present: () => {
      setActiveCamera(true)
    },
    close: () => {
      setActiveCamera(false)
    },
    clear: () => {
      setDeviceCamera(true)
      setFlashCamera(false)
      setActiveCamera(false)
    }
  }))

  const handleSwitchCamera = () => {
    setDeviceCamera(!deviceCamera)
    zoom.value = 0
  }

  const handleHideCamera = () => {
    setActiveCamera(false)
    setDeviceCamera(true)
    onClose?.()
  }

  const handleTakePicture = async () => {
    if (!camera.current || loadingTakePhoto) return
    try {
      setLoadingTakePhoto(true)
      const photo = await camera.current.takePhoto({
        flash: flashCamera ? 'on' : 'off'
      })

      const extension = photo.path.split('.').pop() ?? 'jpeg'
      const filename = new Date().getTime().toString() + extension

      onDone({
        id: photo.path,
        uri: photo.path,
        width: photo.width,
        height: photo.height,
        name: filename,
        filename,
        type: 'image',
        extension,
        mineType: `image/${extension}`,
        fileSize: 0
      })
    } catch (error: any) {
      Alert.alert('Error', error.message)
    } finally {
      setLoadingTakePhoto(false)
    }
  }

  if (device == null || !activeCamera) return

  return (
    <View style={StyleSheet.absoluteFill}>
      <GestureDetector gesture={gesture}>
        <ReanimatedCamera
          ref={camera}
          device={device}
          photo={true}
          isActive={activeCamera}
          exposure={-1}
          animatedProps={animatedProps}
          style={StyleSheet.absoluteFill}
        />
      </GestureDetector>
      <NavigationBar
        onBackPress={handleHideCamera}
        ElementRight={
          <Row>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => setFlashCamera(!flashCamera)}
              style={styles.buttonTopCamera}>
              <Icon name="flash" color={colorFlash} />
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={handleSwitchCamera}
              style={styles.buttonTopCamera}>
              <Icon name="takePhoto" />
            </TouchableOpacity>
          </Row>
        }
      />
      <View
        style={[styles.containerButtonTakePicture, { bottom: spaceBottom }]}>
        <TouchableOpacity
          disabled={loadingTakePhoto}
          onPress={handleTakePicture}
          style={styles.buttonTakePicture}>
          <View style={styles.subButtonTakePicture} />
        </TouchableOpacity>
      </View>
    </View>
  )
})

export default CameraView
