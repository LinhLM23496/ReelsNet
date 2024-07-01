import { StyleSheet } from 'react-native'
import { HEIGHT_NAVIGATION_BAR, space } from 'themes'

export const styles = StyleSheet.create({
  separator: {
    height: space.l
  },
  containerInput: {
    zIndex: 1
  },
  input: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    marginHorizontal: space.s,
    marginVertical: space.s,
    zIndex: 1
  },
  contentList: {
    paddingTop: HEIGHT_NAVIGATION_BAR + space.xs,
    paddingBottom: space.m
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  loadingMore: {
    marginTop: space.xl
  }
})
