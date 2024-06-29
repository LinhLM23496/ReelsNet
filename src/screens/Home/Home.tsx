import { FlatList, StyleSheet, View } from 'react-native'
import React, { useState } from 'react'
import PostItem from './components/PostItem'
import { SafeView } from 'components'
import { space } from 'themes'

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

  const onViewableItemsChanged = ({ viewableItems }: any) => {
    setViewableItems(viewableItems[0].item.id)
  }
  const renderItem = ({ item, index }: any) => {
    const { id } = item
    const isVideo = index % 2 !== 0
    const active = isVideo && viewableItems === id
    return <PostItem key={id} isVideo={isVideo} data={item} active={active} />
  }

  const renderSeparator = () => <View style={styles.separator} />

  return (
    <SafeView>
      <FlatList
        data={DATA}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        ItemSeparatorComponent={renderSeparator}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={{ viewAreaCoveragePercentThreshold: 50 }}
        style={styles.list}
      />
    </SafeView>
  )
}

export default Home

const styles = StyleSheet.create({
  separator: {
    height: space.l
  },
  list: {
    marginBottom: space.l
  }
})
