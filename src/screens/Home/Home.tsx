import {
  ActivityIndicator,
  FlatList,
  Keyboard,
  NativeScrollEvent,
  NativeSyntheticEvent,
  View
} from 'react-native'
import React, { useCallback, useRef, useState } from 'react'
import PostItem from './components/PostItem'
import { Input, SafeView } from 'components'
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming
} from 'react-native-reanimated'
import { styles } from './Home.styles'
import { NavigationService, Route } from 'navigation'
import { PostData } from 'api/posts/types'
import { useFocusEffect } from '@react-navigation/native'
import { getRandomPosts, refreshRandomPosts, selectPosts } from 'stores/posts'
import { useDispatch, useSelector } from 'react-redux'
import { onModal } from 'stores/modal'

const SCROLL_THRESHOLD = 20
const Home = () => {
  const dispatch = useDispatch()
  const { posts } = useSelector(selectPosts)
  const flatlistRef = useRef<FlatList>(null)
  const [viewableItems, setViewableItems] = useState('')
  const [search, setSearch] = useState('')
  const velocityAnimated = useSharedValue(0)
  const [loading, setLoading] = useState(false)
  const [loadingMore, setLoadingMore] = useState(false)
  const [isFocus, setIsFocus] = useState(false)
  let lastOffsetY = 0

  useFocusEffect(
    useCallback(() => {
      setIsFocus(true)
      return () => setIsFocus(false)
    }, [])
  )

  const styleAnimatedNavBar = useAnimatedStyle(() => {
    const translateY = interpolate(velocityAnimated.value, [0, 1], [0, -110], {
      extrapolateRight: Extrapolation.CLAMP
    })

    return { transform: [{ translateY: withTiming(translateY) }] }
  })

  const onViewableItemsChanged = ({ viewableItems }: any) => {
    setViewableItems(viewableItems?.[0]?.item?.id)
  }
  const onScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const currentOffsetY = e.nativeEvent.contentOffset.y

    if (currentOffsetY > lastOffsetY + SCROLL_THRESHOLD) {
      // Scroll down
      velocityAnimated.value = 1
    } else if (currentOffsetY < lastOffsetY) {
      // Scroll up
      velocityAnimated.value = 0
    }

    // Update previous scroll position
    lastOffsetY = currentOffsetY
  }

  const handleEndSearch = (keySearch: string) => {
    if (!search) return
    setSearch('')
    Keyboard.dismiss()
    NavigationService.push(Route.Search, { keySearch })
  }

  const handleLoadMore = async () => {
    if (loadingMore) return
    try {
      setLoadingMore(true)
      await dispatch<any>(getRandomPosts())
    } catch (error) {
      dispatch<any>(
        onModal({
          display: true,
          title: 'Error',
          subTitle: 'An error occurred, please try again.',
          onClose: handleRefresh,
          button: [
            {
              title: 'Retry',
              onPress: handleRefresh
            }
          ]
        })
      )
    } finally {
      setLoadingMore(false)
    }
  }

  const handleRefresh = async () => {
    if (loading || loadingMore) return

    try {
      flatlistRef.current?.scrollToOffset({ animated: true, offset: 0 })
      setLoading(true)
      await dispatch<any>(refreshRandomPosts())
    } catch (error) {
      dispatch<any>(
        onModal({
          display: true,
          title: 'Error',
          subTitle: 'An error occurred, please try again.',
          onClose: handleRefresh,
          button: [
            {
              title: 'Retry',
              onPress: handleRefresh
            }
          ]
        })
      )
    } finally {
      setLoading(false)
    }
  }

  const renderItem = ({ item }: { item: PostData }) => {
    const { id, video_url, is_video } = item
    const isVideo = is_video && !!video_url && video_url.length > 0
    const active = isFocus && isVideo && viewableItems === id
    return <PostItem key={id} isVideo={isVideo} data={item} active={active} />
  }

  const renderSeparator = () => <View style={styles.separator} />

  return (
    <SafeView flex={1}>
      <Animated.View style={[styles.containerInput, styleAnimatedNavBar]}>
        <Input
          value={search}
          onChangeText={setSearch}
          placeholder="search for username..."
          showClear
          iconName="search"
          onSubmitEditing={() => handleEndSearch(search)}
          onPressIcon={() => handleEndSearch(search)}
          enablesReturnKeyAutomatically
          style={styles.input}
        />
      </Animated.View>
      {!loading ? (
        <FlatList
          ref={flatlistRef}
          data={posts}
          renderItem={renderItem}
          onScroll={onScroll}
          keyboardDismissMode="on-drag"
          keyExtractor={(item) => item.id}
          ItemSeparatorComponent={renderSeparator}
          onViewableItemsChanged={onViewableItemsChanged}
          viewabilityConfig={{ viewAreaCoveragePercentThreshold: 50 }}
          contentContainerStyle={styles.contentList}
          initialNumToRender={6}
          maxToRenderPerBatch={10}
          windowSize={5}
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0.5}
          ListFooterComponent={
            loadingMore ? (
              <ActivityIndicator size="large" style={styles.loadingMore} />
            ) : null
          }
        />
      ) : (
        <ActivityIndicator size="large" style={styles.loading} />
      )}
    </SafeView>
  )
}

export default Home
