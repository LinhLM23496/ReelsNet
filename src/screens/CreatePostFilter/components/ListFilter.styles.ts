import { StyleSheet } from 'react-native'
import { space, avatarSize, color } from 'themes'

export const styles = StyleSheet.create({
  listFilter: {
    flex: 0
  },
  containerContentFilter: {
    gap: space.m,
    paddingHorizontal: space.m,
    paddingBottom: space.m
  },
  containerItemFilter: {
    gap: space.xxs
  },
  itemFilter: {
    width: avatarSize.l,
    height: 'auto',
    aspectRatio: 9 / 16,
    backgroundColor: color.white,
    borderRadius: space.xxs
  }
})
