import { ActivityIndicator, Image, TouchableOpacity } from 'react-native'
import React, {
  Ref,
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState
} from 'react'
import BottomSheet, { BottomSheetFlatList } from '@gorhom/bottom-sheet'
import { color, space } from 'themes'
import { Ratio } from 'components'
import { useDidMountEffect, useGallery } from 'hooks'
import { ImageType } from 'hooks/useGallery'
import { styles } from './BottomSheetMedia.styles'
import { BSMediaRef, Props } from './BottomSheetMedia.types'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

const BottomSheetMedia = forwardRef((props: Props, ref: Ref<BSMediaRef>) => {
  const { bottom } = useSafeAreaInsets()
  const paddingBottom = bottom + space.m
  const { isMultiple, currentSelect, changeCurrentSelect } = props
  const snapPoints = ['40%']
  const bottomSheetRef = useRef<BottomSheet>(null)
  const [select, setSelect] = useState<ImageType[]>([])
  const {
    photos,
    isLoading,
    isLoadingNextPage,
    hasNextPage,
    loadNextPagePictures,
    getUnloadedPictures
  } = useGallery({ assetType: 'All' })

  useEffect(() => {
    loadNextPagePictures().then((listPhoto) => {
      if (listPhoto?.length) {
        const photoFirst = listPhoto[0]
        changeCurrentSelect(photoFirst)
        setSelect([photoFirst])
      }
    })
  }, [])

  useDidMountEffect(() => {
    if (!isMultiple && select.length > 1 && photos?.length) {
      const photoFirst = photos[0]
      setSelect([photoFirst])
    }
  }, [isMultiple])

  useImperativeHandle(ref, () => ({
    getSelected: () => select,
    refresh: getUnloadedPictures
  }))

  const renderMedia = ({ item }: { item: ImageType }) => {
    const { uri } = item
    const itemIndex = select.findIndex((i) => i.uri === uri)
    const active = itemIndex !== -1
    const currentActive = currentSelect?.uri === uri
    const opacity = currentActive ? 0.5 : 1
    const disabled = isMultiple
      ? select.length < 2 && currentActive
      : currentActive

    const handleSelect = () => {
      if (disabled) return
      if (!isMultiple) {
        changeCurrentSelect(item)
        setSelect([item])
        return
      }
      if (isMultiple) {
        // add when current select is not in select
        if (!currentActive && !active) {
          changeCurrentSelect(item)
          setSelect((prev) => [...prev, item])
          return
        } else {
          // change current select
          if (!currentActive) {
            changeCurrentSelect(item)
            return
          } else {
            // remove when current select is in select
            const newArray = select.filter((i) => i.uri !== uri)
            changeCurrentSelect(newArray.at(-1) as ImageType)
            setSelect(newArray)
            return
          }
        }
      }
    }
    return (
      <TouchableOpacity
        disabled={disabled}
        activeOpacity={0.8}
        onPress={handleSelect}
        style={[styles.containerMedia, { opacity }]}>
        <Image source={{ uri: item.uri }} style={styles.media} />
        {isMultiple ? (
          <Ratio active={active} number={itemIndex + 1} style={styles.ratio} />
        ) : null}
      </TouchableOpacity>
    )
  }

  const handleLoadMore = () => {
    if (isLoadingNextPage || !hasNextPage) return
    loadNextPagePictures()
  }

  return (
    <BottomSheet ref={bottomSheetRef} snapPoints={snapPoints}>
      {!isLoading ? (
        <BottomSheetFlatList
          data={photos}
          numColumns={4}
          renderItem={renderMedia}
          keyExtractor={(item) => item.uri}
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0.1}
          ListFooterComponent={
            isLoadingNextPage ? (
              <ActivityIndicator
                size="large"
                color={color.primary}
                style={styles.loading}
              />
            ) : null
          }
          contentContainerStyle={{ paddingBottom }}
        />
      ) : (
        <ActivityIndicator
          size="large"
          color={color.primary}
          style={styles.loading}
        />
      )}
    </BottomSheet>
  )
})

export default BottomSheetMedia
