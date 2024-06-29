import {
  FlatList,
  Keyboard,
  NativeScrollEvent,
  NativeSyntheticEvent,
  View
} from 'react-native'
import React, { useState } from 'react'
import PostItem from './components/PostItem'
import { Input, SafeView } from 'components'
import { HEIGHT_NAVIGATION_BAR, space } from 'themes'
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming
} from 'react-native-reanimated'
import { styles } from './Home.styles'
import { NavigationService, Route } from 'navigation'

const DATA = [
  {
    id: '1',
    title: 'First Item'
  },
  {
    id: '2',
    title: 'Second Item'
  },
  {
    id: '3',
    title: 'Third Item'
  },
  {
    id: '4',
    title: 'Fourth Item'
  },
  {
    id: '5',
    title: 'Fifth Item'
  }
]

const Home = () => {
  const [viewableItems, setViewableItems] = useState('')
  const [search, setSearch] = useState('')
  const velocityAnimated = useSharedValue(0)

  const styleAnimatedNavBar = useAnimatedStyle(() => {
    const translateY = interpolate(velocityAnimated.value, [0, 1], [0, -110], {
      extrapolateRight: Extrapolation.CLAMP
    })

    return { transform: [{ translateY: withTiming(translateY) }] }
  })

  const onViewableItemsChanged = ({ viewableItems }: any) => {
    setViewableItems(viewableItems[0].item.id)
  }

  const onScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const offsetY = e.nativeEvent.contentOffset.y
    const velocityY = e.nativeEvent.velocity?.y
    const sizeHeight = e.nativeEvent.contentSize.height
    const isShowSearch =
      offsetY <= HEIGHT_NAVIGATION_BAR ||
      offsetY >= sizeHeight - space.height ||
      (!!velocityY && velocityY < 0) ||
      !velocityY

    velocityAnimated.value = velocityY ?? 0

    if (isShowSearch) {
      velocityAnimated.value = 0
    } else {
      velocityAnimated.value = 1
    }
  }

  const handleEndSearch = (keySearch: string) => {
    if (!search) return
    setSearch('')
    Keyboard.dismiss()
    NavigationService.push(Route.Search, { keySearch })
  }

  const renderItem = ({ item, index }: any) => {
    const { id } = item
    const isVideo = index % 2 !== 0
    const active = isVideo && viewableItems === id
    return <PostItem key={id} isVideo={false} data={item} active={active} />
  }

  const renderSeparator = () => <View style={styles.separator} />

  return (
    <SafeView>
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
      <FlatList
        data={DATA}
        renderItem={renderItem}
        onScroll={onScroll}
        keyboardDismissMode="on-drag"
        keyExtractor={(item) => item.id}
        ItemSeparatorComponent={renderSeparator}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={{ viewAreaCoveragePercentThreshold: 50 }}
        contentContainerStyle={styles.contentList}
      />
    </SafeView>
  )
}

export default Home
