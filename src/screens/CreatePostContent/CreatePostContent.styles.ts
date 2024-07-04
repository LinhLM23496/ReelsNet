import { StyleSheet } from 'react-native'
import { space, color, colorRange } from 'themes'

export const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  subContainer: {
    gap: space.m,
    paddingBottom: space['3xl'] * 2
  },
  containerContent: {
    gap: space.m
  },
  input: {
    paddingHorizontal: space.m
  },
  containerButton: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingBottom: space.m,
    paddingHorizontal: space.m,
    paddingTop: space.xs,
    backgroundColor: color.white
  },
  action: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: space.m,
    paddingVertical: space.s,
    borderTopWidth: 1,
    borderColor: colorRange.gray[200],
    alignItems: 'flex-start'
  }
})
