import { Image, StyleSheet, TouchableOpacity, View } from 'react-native'
import React, { useRef, useState } from 'react'
import { Button, NavigationBar, Row, Text } from 'components'
import { color, space } from 'themes'
import BottomSheetMedia from './components/BottomSheetMedia'
import { useToggle } from 'hooks'
import { ImageType } from 'hooks/useGallery'
import { BSMediaRef } from './components/BottomSheetMedia.types'
import { NavigationService, Route } from 'navigation'

const CreatePost = () => {
  const mediaRef = useRef<BSMediaRef>(null)
  const [isMultiple, setIsMultiple] = useToggle(false)
  const [currentSelect, setCurrentSelect] = useState<ImageType>()
  const handle = () => {}

  const handleContinue = () => {
    const selected = mediaRef.current?.getSelected()
    if (!selected || !selected?.length) return
    NavigationService.push(Route.CreatePostContent, { media: selected })
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
          iconName="plus"
          iconColor={color.white}
          spacing="xxs"
          onPress={handle}
        />
      </Row>
      <View style={styles.empty} />
      <BottomSheetMedia
        ref={mediaRef}
        isMultiple={isMultiple}
        currentSelect={currentSelect as ImageType}
        changeCurrentSelect={setCurrentSelect}
      />
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
