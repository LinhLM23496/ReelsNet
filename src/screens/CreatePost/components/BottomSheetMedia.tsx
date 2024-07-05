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
import { Ratio, Text } from 'components'
import { useDidMountEffect, useGallery } from 'hooks'
import { MediaType } from 'hooks/useGallery'
import { styles } from './BottomSheetMedia.styles'
import { BSMediaRef, Props } from './BottomSheetMedia.types'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { formatTime } from 'lib'

const LIMIT = 10

const BottomSheetMedia = forwardRef((props: Props, ref: Ref<BSMediaRef>) => {
  const { bottom } = useSafeAreaInsets()
  const paddingBottom = bottom + space.m
  const { isMultiple, currentSelect, changeCurrentSelect } = props
  const snapPoints = ['40%']
  const bottomSheetRef = useRef<BottomSheet>(null)
  const [select, setSelect] = useState<MediaType[]>([])
  const {
    media,
    isLoading,
    isLoadingNextPage,
    hasNextPage,
    loadNextPageMedia,
    getUnloadedPictures
  } = useGallery({ assetType: 'All' })
  // TODO: get All: video + image

  useEffect(() => {
    loadNextPageMedia().then((listMedia) => {
      if (listMedia?.length) {
        const mediaFirst = listMedia[0]
        changeCurrentSelect(mediaFirst)
        setSelect([mediaFirst])
      }
    })
  }, [])

  useDidMountEffect(() => {
    if (!isMultiple && select.length > 1 && media?.length) {
      const mediaFirst = media[0]
      setSelect([mediaFirst])
    }
  }, [isMultiple])

  useImperativeHandle(ref, () => ({
    getSelected: () => select,
    updateSelected: (positionImage) =>
      setSelect((prev) =>
        isMultiple ? [...prev, positionImage] : [positionImage]
      ),
    refresh: () => getUnloadedPictures()
  }))

  const renderMedia = ({ item }: { item: MediaType }) => {
    const { uri, type, playableDuration } = item
    const itemIndex = select.findIndex((i) => i.uri === uri)
    const isVideo = type === 'video'
    const active = itemIndex !== -1
    const currentActive = currentSelect?.uri === uri
    const opacity = currentActive ? 0.5 : 1
    const disabled = isMultiple
      ? (select.length < 2 && currentActive) ||
        (select.length >= LIMIT && !active)
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
            changeCurrentSelect(newArray.at(-1) as MediaType)
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
        {isVideo ? (
          <Text size="s" style={styles.playableDuration}>
            {formatTime(playableDuration ?? 0)}
          </Text>
        ) : null}
      </TouchableOpacity>
    )
  }

  const handleLoadMore = () => {
    if (isLoadingNextPage || !hasNextPage) return
    loadNextPageMedia()
  }

  return (
    <BottomSheet ref={bottomSheetRef} snapPoints={snapPoints}>
      {!isLoading ? (
        <BottomSheetFlatList
          data={media}
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
