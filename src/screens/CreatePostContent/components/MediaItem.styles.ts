import { StyleSheet } from 'react-native'
import { space, color } from 'themes'

export const styles = StyleSheet.create({
  item: {
    width: space.half_width,
    height: 'auto',
    aspectRatio: 9 / 16,
    backgroundColor: color.white,
    borderRadius: space.xs
  },
  time: {
    position: 'absolute',
    bottom: space.xxs,
    right: space.xxs
  }
})
