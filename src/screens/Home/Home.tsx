import {
  ActivityIndicator,
  FlatList,
  Keyboard,
  NativeScrollEvent,
  NativeSyntheticEvent,
  View
} from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
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
import { postsAPI } from 'api'
import { useFocusEffect } from '@react-navigation/native'

const SCROLL_THRESHOLD = 20
const Home = () => {
  const [viewableItems, setViewableItems] = useState('')
  const [search, setSearch] = useState('')
  const velocityAnimated = useSharedValue(0)
  const [data, setData] = useState<PostData[]>([])
  const [loading, setLoading] = useState(false)
  const [loadingMore, setLoadingMore] = useState(false)
  const [isFocus, setIsFocus] = useState(false)
  const [paging, setPaging] = useState<string | null>()
  let lastOffsetY = 0

  useEffect(() => {
    fetchData()
  }, [])

  useFocusEffect(
    useCallback(() => {
      setIsFocus(true)
      return () => setIsFocus(false)
    }, [])
  )

  const fetchData = async (page?: string) => {
    if (loading || loadingMore) return
    try {
      page ? setLoadingMore(true) : setLoading(true)
      const response = await postsAPI.getPosts({
        username_or_id_or_url: 'mrbeast',
        pagination_token: page
      })
      setData((prev) =>
        page ? [...prev, ...response.data.items] : response.data.items
      )
      setPaging(response.pagination_token)
    } catch (error) {
      console.error('error', error)
    } finally {
      page ? setLoadingMore(false) : setLoading(false)
    }
  }

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

  const handleLoadMore = () => {
    if (!paging || loading || loadingMore) return
    fetchData(paging)
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
          data={data}
          renderItem={renderItem}
          onScroll={onScroll}
          keyboardDismissMode="on-drag"
          keyExtractor={(item) => item.id}
          ItemSeparatorComponent={renderSeparator}
          onViewableItemsChanged={onViewableItemsChanged}
          viewabilityConfig={{ viewAreaCoveragePercentThreshold: 50 }}
          contentContainerStyle={styles.contentList}
          initialNumToRender={4}
          maxToRenderPerBatch={6}
          windowSize={3}
          onEndReached={handleLoadMore}
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
