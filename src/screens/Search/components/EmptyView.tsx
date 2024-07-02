import { Image, View } from 'react-native'
import React from 'react'
import { Text } from 'components'
import { images } from 'assets'
import { styles } from './EmptyView.styles'

const EmptyView = () => {
  return (
    <View style={styles.container}>
      <Image source={images.empty} style={styles.imageEmpty} />
      <Text fontWeight="bold">No Results Found</Text>
      <Text textAlign="center" size="s" style={styles.content}>
        We're sorry, but we couldn't find any results matching your search
        criteria. Please try again with a different keyword or check your
        spelling for accuracy.
      </Text>
    </View>
  )
}

export default EmptyView
