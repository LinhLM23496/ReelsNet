import { StyleSheet } from 'react-native'
import { color, space } from 'themes'

export const styles = StyleSheet.create({
  containerMedia: {
    width: space.width / 4,
    borderWidth: 1,
    borderColor: color.white
  },
  media: {
    flex: 1,
    width: '100%',
    height: 'auto',
    aspectRatio: 1
  },
  ratio: {
    position: 'absolute',
    right: space.xxs,
    top: space.xxs
  },
  loading: {
    marginTop: space.xxl
  }
})
