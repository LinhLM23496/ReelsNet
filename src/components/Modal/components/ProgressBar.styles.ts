import { StyleSheet } from 'react-native'
import { space } from 'themes'

export const styles = StyleSheet.create({
  container: {
    width: '100%'
  },
  background: {
    flex: 1,
    borderRadius: space.xl,
    overflow: 'hidden'
  },
  progress: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0
  }
})
