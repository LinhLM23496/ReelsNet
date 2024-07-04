import {
  Image,
  Linking,
  TouchableNativeFeedback,
  TouchableOpacity,
  View
} from 'react-native'
import React, { useRef, useState } from 'react'
import { Button, NavigationBar, Row, Text } from 'components'
import { color } from 'themes'
import BottomSheetMedia from './components/BottomSheetMedia'
import { useDidMountEffect, usePermission, useToggle } from 'hooks'
import { MediaType } from 'hooks/useGallery'
import { BSMediaRef } from './components/BottomSheetMedia.types'
import { NavigationService, Route } from 'navigation'
import CameraView from './components/CameraView'
import { CameraRef } from './components/CameraView.types'
import { CameraRoll } from '@react-native-camera-roll/camera-roll'
import { useDispatch } from 'react-redux'
import { onModal } from 'stores/modal'
import { styles } from './CreatePost.styles'
import Video, { VideoRef } from 'react-native-video'
import { formatTime } from 'lib'

// TODO: current media is photos beacause I haven't handled the video case yet.
// TODO: hanlde video
const CreatePost = () => {
  const dispatch = useDispatch()
  const { requestMultiPermission } = usePermission()
  const mediaRef = useRef<BSMediaRef>(null)
  const cameraRef = useRef<CameraRef>(null)
  const videoRef = useRef<VideoRef>(null)
  const [isMultiple, setIsMultiple] = useToggle(false)
  const [currentSelect, setCurrentSelect] = useState<MediaType>()
  const { width = 0, height = 0, uri, type } = currentSelect ?? {}

  const [isShowController, setIsShowController] = useToggle(false)
  const [paused, setPaused] = useState(true)
  const [currentTime, setCurrentTime] = useState(0)
  const isVideo = type === 'video'
  const opacity = isShowController ? 0.3 : 1
  const aspectRatio = width / height

  useDidMountEffect(() => {
    !paused && setPaused(true)
    currentTime !== 0 && setCurrentTime(0)
    isShowController && setIsShowController()
  }, [currentSelect])

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
    if (selected.some((i) => i.type === 'video')) {
      return NavigationService.push(Route.CreatePostContent, {
        media: selected
      })
    }
    NavigationService.push(Route.CreatePostFilter, { media: selected })
  }

  const onTakeCamera = async (photo: MediaType) => {
    if (!photo) return
    cameraRef.current?.close()
    CameraRoll.saveAsset(photo.uri).then((photoSave) => {
      mediaRef.current?.refresh()
      const image = photoSave.node.image as unknown as MediaType
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
          <View style={[styles.item, { aspectRatio }]}>
            {isVideo ? (
              <View style={styles.video}>
                <TouchableNativeFeedback
                  disabled={!isVideo}
                  style={{}}
                  onPress={setIsShowController}>
                  <View>
                    <Video
                      ref={videoRef}
                      source={{ uri }}
                      paused={paused}
                      onEnd={() => {
                        videoRef.current?.seek(0)
                        setPaused(true)
                      }}
                      onProgress={({ currentTime: _currentTime }) =>
                        setCurrentTime(_currentTime)
                      }
                      resizeMode="cover"
                      style={[styles.subItem, { opacity }]}
                    />
                    <Text fontWeight="bold" style={styles.currentTime}>
                      {formatTime(currentTime)}
                    </Text>
                  </View>
                </TouchableNativeFeedback>
                {isShowController ? (
                  <Button
                    variant="ghost"
                    iconName={paused ? 'play' : 'pause'}
                    onPress={() => {
                      if (paused) {
                        setTimeout(() => {
                          setIsShowController()
                        }, 250)
                      }
                      !paused && videoRef.current?.pause()
                      setPaused(!paused)
                    }}
                    style={[styles.buttonPlay]}
                  />
                ) : null}
              </View>
            ) : (
              <Image
                source={{ uri }}
                style={styles.subItem}
                resizeMode="cover"
              />
            )}
          </View>
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
        currentSelect={currentSelect as MediaType}
        changeCurrentSelect={setCurrentSelect}
      />
      <CameraView ref={cameraRef} onDone={onTakeCamera} />
    </View>
  )
}

export default CreatePost
