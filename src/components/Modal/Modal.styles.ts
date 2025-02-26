import { StyleSheet } from 'react-native'
import { space, color, avatarSize } from 'themes'

export const styles = StyleSheet.create({
  modalOverlay: {
    ...StyleSheet.absoluteFillObject
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: space.xl
  },
  centeredView: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  modalView: {
    width: '100%',
    borderRadius: space.s,
    paddingHorizontal: space.m,
    paddingBottom: space.s,
    alignItems: 'center',
    backgroundColor: color.white
  },
  close: {
    margin: space.s
  },
  buttonClose: {
    position: 'absolute',
    top: space.s / 4,
    right: space.s / 4
  },
  modalText: {
    textAlign: 'center'
  },
  progressBar: {
    position: 'absolute',
    bottom: 0
  },
  character: {
    position: 'absolute',
    left: -avatarSize.l / 2.5,
    bottom: -avatarSize.l / 2.5,
    width: avatarSize.l,
    height: avatarSize.l
  }
})
