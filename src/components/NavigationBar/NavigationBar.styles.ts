import { StyleSheet } from 'react-native'
import { color, fontSize, space } from 'themes'

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: space.s
  },
  title: {
    fontWeight: 'bold',
    textAlign: 'center'
  },
  accessory: {
    flex: 3
  },
  center: {
    flex: 6
  },
  accessoryRight: {
    alignItems: 'flex-end'
  },
  subTitle: {
    marginTop: -space.xxs,
    textAlign: 'center',
    fontSize: fontSize.s
  },
  absolute: {
    position: 'absolute',
    top: 0,
    right: 0,
    left: 0,
    zIndex: 1
  },
  transparent: {
    backgroundColor: color.transparent
  },
  buttonAccessory: {
    paddingLeft: space.m
  }
})
