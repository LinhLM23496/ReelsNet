import { FlatList, TouchableOpacity, View } from 'react-native'
import React, { FC, useRef, useState } from 'react'
import { NavigationBar, SafeView, Text } from 'components'
import { NavigationService, Route, ScreenProps } from 'navigation'
import { HEIGHT_NAVIGATION_BAR, color } from 'themes'
import { ImageType } from 'hooks/useGallery'
import { useDispatch } from 'react-redux'
import { onModal } from 'stores/modal/modal.action'
import ImageItem from './components/ImageItem'
import { DATA_FILTER, snapToInterval } from './contants'
import ListFilter from './components/ListFilter'
import { FilterType } from './CreatePostFilter.types'
import { styles } from './CreatePostFilter.styles'
import { ImageItemRef } from './components/ImageItem.types'

const DEFAULT_FILTER = DATA_FILTER[0]

const CreatePostFilter: FC<ScreenProps<'CreatePostFilter'>> = ({ route }) => {
  const { media } = route.params
  const [images, setImages] = useState<ImageType[]>(media)
  const isMultiple = images.length > 1
  const dispatch = useDispatch()
  const [selected, setSelected] = useState<FilterType>(DEFAULT_FILTER)
  const viewShotRefs = useRef(images.map(() => React.createRef<ImageItemRef>()))

  const handleContinue = async () => {
    let listImage: ImageType[] = images
    if (selected.id !== DEFAULT_FILTER.id) {
      listImage = await Promise.all(
        viewShotRefs.current.map((ref) =>
          ref.current ? ref.current.capture() : Promise.reject('Ref is null')
        )
      )
    }

    NavigationService.push(Route.CreatePostContent, { media: listImage })
  }

  const renderMedia = ({ item, index }: { item: ImageType; index: number }) => {
    const { uri } = item

    const onDelete = () => {
      const newImages = images.filter((i) => i.uri !== uri)
      setImages(newImages)
    }

    const handleDelete = () => {
      if (!isMultiple) return
      dispatch<any>(
        onModal({
          display: true,
          title: 'Delete',
          subTitle: 'Are you sure you want to delete this image?',
          button: [
            {
              title: 'Delete',
              borderRadius: 's',
              backgroundColor: color.danger,
              onPress: onDelete
            },
            {
              title: 'Cancel',
              borderRadius: 's',
              onPress: () => {}
            }
          ]
        })
      )
    }

    return (
      <ImageItem
        ref={viewShotRefs.current[index]}
        key={uri}
        data={item}
        matrix={selected.matrix}
        onDelete={handleDelete}
        isDelete={isMultiple}
      />
    )
  }

  return (
    <View style={styles.container}>
      <NavigationBar
        absolute
        title="Create Post"
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
      <SafeView marginTop={HEIGHT_NAVIGATION_BAR} style={styles.container}>
        <FlatList
          horizontal
          scrollEnabled={isMultiple}
          data={images}
          keyExtractor={(item) => item.uri}
          renderItem={renderMedia}
          contentContainerStyle={styles.containerContent}
          pagingEnabled
          snapToInterval={snapToInterval}
          showsHorizontalScrollIndicator={false}
        />
        <ListFilter onPress={setSelected} />
      </SafeView>
    </View>
  )
}

export default CreatePostFilter
