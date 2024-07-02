import { StyleSheet } from 'react-native'
import { space } from 'themes'

export const styles = StyleSheet.create({
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
