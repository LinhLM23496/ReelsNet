import { avatarSize, color, space } from 'themes'
import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  buttonTopCamera: {
    paddingHorizontal: space.m,
    paddingVertical: space.xxs,
    marginRight: space.xs
  },
  buttonTakePicture: {
    width: avatarSize.l,
    aspectRatio: 1,
    borderRadius: 100,
    backgroundColor: color.white,
    alignItems: 'center',
    justifyContent: 'center'
  },
  subButtonTakePicture: {
    width: '90%',
    height: '90%',
    borderRadius: 100,
    backgroundColor: color.white,
    borderWidth: 2,
    borderColor: color.black
  },
  containerButtonTakePicture: {
    position: 'absolute',
    width: '100%',
    alignItems: 'center'
  }
})
