import { StyleSheet } from 'react-native'
import { avatarSize, space } from 'themes'

export const styles = StyleSheet.create({
  buttonContainer: {
    width: '100%',
    marginTop: space.xl
  },
  button: {
    flex: 1,
    paddingVertical: space.xs
  },
  title: {
    marginHorizontal: space.m
  },
  containerImage: {
    marginVertical: space.s
  },
  image: {
    width: avatarSize.m,
    height: 'auto',
    aspectRatio: 1
  },
  iconCheck: {
    position: 'absolute',
    bottom: -space.xxs,
    right: -space.xxs
  }
})
