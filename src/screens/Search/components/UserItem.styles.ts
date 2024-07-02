import { StyleSheet } from 'react-native'
import { space, color, avatarSize } from 'themes'

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: space.s,
    backgroundColor: color.white,
    borderRadius: space.xxs,
    gap: space.s
  },
  avatar: {
    width: avatarSize.xs,
    height: 'auto',
    aspectRatio: 1,
    borderRadius: avatarSize.xs
  },
  iconCheck: {
    position: 'absolute',
    bottom: -space.xs / 4,
    right: -space.xs / 4
  }
})
