import { StyleSheet } from 'react-native'
import { space } from 'themes'

export const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  buttonContinue: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: space.m
  },
  body: {
    flex: 1,
    alignItems: 'center'
  },
  item: {
    width: 'auto',
    height: '100%'
  },
  subItem: {
    width: '100%',
    height: '100%'
  },
  footer: {
    paddingHorizontal: space.m,
    marginTop: space.s
  },
  empty: {
    flex: 1
  },
  currentTime: {
    position: 'absolute',
    bottom: space.xxs,
    right: space.xxs
  },
  buttonPlay: {
    position: 'absolute'
  },
  video: {
    justifyContent: 'center'
  }
})
