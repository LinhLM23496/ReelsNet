import { StyleSheet } from 'react-native'
import { space, color } from 'themes'
import { cardFull } from '../contants'

export const styles = StyleSheet.create({
  containerItem: {
    borderRadius: space.s,
    overflow: 'hidden'
  },
  buttonDelete: {
    position: 'absolute',
    top: space.xxs / 2,
    right: space.xxs / 2
  },
  item: {
    width: cardFull,
    height: 'auto',
    aspectRatio: 9 / 16,
    backgroundColor: color.white,
    borderRadius: space.xs
  }
})
