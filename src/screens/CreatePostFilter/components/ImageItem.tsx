import { Image, View } from 'react-native'
import React, { Ref, useImperativeHandle, useRef } from 'react'
import { Button } from 'components'
import { ColorMatrix } from 'react-native-color-matrix-image-filters'
import { ImageItemRef, Props } from './ImageItem.types'
import { styles } from './ImageItem.styles'
import ViewShot from 'react-native-view-shot'

const ImageItem = (props: Props, ref: Ref<ImageItemRef>) => {
  const { data, matrix, onDelete, isDelete } = props
  const { uri } = data
  const viewShotRef = useRef<ViewShot>(null)

  useImperativeHandle(ref, () => ({
    capture: async () => {
      const fnCapture = viewShotRef.current?.capture
      if (!fnCapture) return Promise.resolve(data)
      return fnCapture()
        .then((uri) => {
          return { ...data, uri }
        })
        .catch(() => data)
    }
  }))

  return (
    <View style={styles.containerItem}>
      <ViewShot
        ref={viewShotRef}
        style={styles.item}
        options={{ format: 'jpg', quality: 0.9 }}>
        <ColorMatrix matrix={matrix}>
          <Image source={{ uri }} resizeMode="contain" style={styles.item} />
        </ColorMatrix>
      </ViewShot>
      {isDelete ? (
        <Button
          variant="ghost"
          iconName="close"
          onPress={onDelete}
          spacing="xxs"
          style={styles.buttonDelete}
        />
      ) : null}
    </View>
  )
}

export default React.forwardRef(ImageItem)
