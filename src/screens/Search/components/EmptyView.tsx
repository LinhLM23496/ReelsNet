import { Image, StyleSheet, View } from 'react-native'
import React from 'react'
import { Text } from 'components'
import { space } from 'themes'
import { images } from 'assets'

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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: space.xl,
    gap: space.m
  },
  imageEmpty: {
    width: space.width * 0.7,
    height: 'auto',
    aspectRatio: 1
  },
  content: {
    paddingHorizontal: space.xs
  }
})
