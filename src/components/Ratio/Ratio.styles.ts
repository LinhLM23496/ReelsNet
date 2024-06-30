import { StyleSheet } from 'react-native'
import { color } from 'themes'

export const styles = StyleSheet.create({
  container: {
    height: 'auto',
    aspectRatio: 1,
    borderWidth: 1,
    borderRadius: 100
  },
  dot: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  dotActive: {
    height: '100%',
    width: '100%',
    borderRadius: 100,
    backgroundColor: color.primary
  }
})
