import { Image, Linking, TouchableOpacity, View } from 'react-native'
import React, { useRef, useState } from 'react'
import { Button, NavigationBar, Row, Text } from 'components'
import { color } from 'themes'
import BottomSheetMedia from './components/BottomSheetMedia'
import { usePermission, useToggle } from 'hooks'
import { ImageType } from 'hooks/useGallery'
import { BSMediaRef } from './components/BottomSheetMedia.types'
import { NavigationService, Route } from 'navigation'
import CameraView from './components/CameraView'
import { CameraRef } from './components/CameraView.types'
import { CameraRoll } from '@react-native-camera-roll/camera-roll'
import { useDispatch } from 'react-redux'
import { onModal } from 'stores/modal'
import { styles } from './CreatePost.styles'

// TODO: current media is photos beacause I haven't handled the video case yet.
// TODO: hanlde video
const CreatePost = () => {
  const dispatch = useDispatch()
  const { requestMultiPermission } = usePermission()
  const mediaRef = useRef<BSMediaRef>(null)
  const cameraRef = useRef<CameraRef>(null)
  const [isMultiple, setIsMultiple] = useToggle(false)
  const [currentSelect, setCurrentSelect] = useState<ImageType>()
  const handleCamera = () => {
    requestMultiPermission(['camera'])
      .then((value) => {
        value && cameraRef.current?.present()
      })
      .catch(() => {
        dispatch<any>(
          onModal({
            display: true,
            title: 'Allow ReelsNet to access your camera?',
            content:
              'Turn on Photos service to allow ReelsNet to access your camera.',
            button: [
              {
                variant: 'ghost',
                title: 'Discard',
                onPress: () => {}
              },
              {
                title: 'Settings',
                onPress: () => Linking.openSettings()
              }
            ]
          })
        )
      })

    // TODO: record video
  }

  const handleContinue = () => {
    const selected = mediaRef.current?.getSelected()
    if (!selected || !selected?.length) return
    NavigationService.push(Route.CreatePostFilter, { media: selected })
  }

  const onTakeCamera = async (photo: ImageType) => {
    if (!photo) return
    cameraRef.current?.close()
    CameraRoll.saveAsset(photo.uri).then((photoSave) => {
      mediaRef.current?.refresh()
      const image = photoSave.node.image as unknown as ImageType
      setCurrentSelect(image)
      mediaRef.current?.updateSelected(image)
    })
  }

  const onConfirm = () => {
    NavigationService.goBack()
  }

  const handleBack = () => {
    dispatch<any>(
      onModal({
        display: true,
        title: 'Discard creating post?',
        subTitle: "If you discard, your new post won't be created.",
        button: [
          {
            title: 'Discard',
            variant: 'ghost',
            colorText: color.danger,
            onPress: onConfirm
          },
          {
            title: 'Keep editing',
            borderRadius: 's',
            onPress: () => {}
          }
        ]
      })
    )
  }

  return (
    <View style={styles.container}>
      <NavigationBar
        title={'Create Post'}
        iconLeft="close"
        onBackPress={handleBack}
        ElementRight={
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={handleContinue}
            style={styles.buttonContinue}>
            <Text fontWeight="500" color={color.primary}>
              Continue
            </Text>
          </TouchableOpacity>
        }
      />
      <View style={styles.body}>
        {currentSelect ? (
          <Image source={{ uri: currentSelect.uri }} style={styles.item} />
        ) : null}
      </View>
      <Row alignSelf="flex-end" gap="xs" style={styles.footer}>
        <Button
          iconName="copy"
          variant={isMultiple ? 'filled' : 'outline'}
          spacing="xxs"
          iconColor={isMultiple ? color.white : color.black}
          onPress={setIsMultiple}
          style={{ borderColor: color.transparent }}
        />
        <Button
          variant="outline"
          iconName="camera"
          iconColor={color.black}
          spacing="xxs"
          onPress={handleCamera}
          style={{ borderColor: color.transparent }}
        />
      </Row>
      <View style={styles.empty} />
      <BottomSheetMedia
        ref={mediaRef}
        isMultiple={isMultiple}
        currentSelect={currentSelect as ImageType}
        changeCurrentSelect={setCurrentSelect}
      />
      <CameraView ref={cameraRef} onDone={onTakeCamera} />
    </View>
  )
}

export default CreatePost
