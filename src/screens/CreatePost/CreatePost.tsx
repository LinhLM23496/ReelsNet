import { Image, StyleSheet, TouchableOpacity, View } from 'react-native'
import React, { useRef, useState } from 'react'
import { Button, NavigationBar, Row, Text } from 'components'
import { color, space } from 'themes'
import BottomSheetMedia from './components/BottomSheetMedia'
import { usePermission, useToggle } from 'hooks'
import { ImageType } from 'hooks/useGallery'
import { BSMediaRef } from './components/BottomSheetMedia.types'
import { NavigationService, Route } from 'navigation'
import CameraView from './components/CameraView'
import { CameraRef } from './components/CameraView.types'
import { CameraRoll } from '@react-native-camera-roll/camera-roll'

const CreatePost = () => {
  const { requestMultiPermission } = usePermission()
  const mediaRef = useRef<BSMediaRef>(null)
  const cameraRef = useRef<CameraRef>(null)
  const [isMultiple, setIsMultiple] = useToggle(false)
  const [currentSelect, setCurrentSelect] = useState<ImageType>()
  const handleCamera = () => {
    requestMultiPermission(['camera']).then((value) => {
      value && cameraRef.current?.present()
    })

    // TODO: record video
  }

  const handleContinue = () => {
    const selected = mediaRef.current?.getSelected()
    if (!selected || !selected?.length) return
    NavigationService.push(Route.CreatePostContent, { media: selected })
  }

  const onTakeCamera = async (photo: ImageType) => {
    if (!photo) return
    cameraRef.current?.close()
    CameraRoll.saveAsset(photo.uri).then((photoSave) => {
      mediaRef.current?.refresh()
      const image = photoSave.node.image as unknown as ImageType
      setCurrentSelect(image)
    })
  }

  return (
    <View style={styles.container}>
      <NavigationBar
        title={'Create Post'}
        iconLeft="close"
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

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  buttonContinue: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: space.m
  },
  body: {
    flex: 1,
    alignItems: 'center'
  },
  item: {
    flex: 1,
    width: '80%',
    height: 'auto'
  },
  footer: {
    paddingHorizontal: space.m,
    marginTop: space.s
  },
  empty: {
    flex: 1
  }
})
