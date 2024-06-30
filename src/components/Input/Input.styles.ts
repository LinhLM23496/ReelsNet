import { StyleSheet } from 'react-native'
import { space } from 'themes'

export const styles = StyleSheet.create({
  container: {
    gap: space.xxs,
    flex: 1,
    height: 'auto'
  },
  label: {
    marginLeft: space.s
  },
  content: {
    paddingHorizontal: space.xxs,
    marginVertical: 0,
    borderRadius: space.xs,
    alignItems: 'center'
  },
  inputStyle: {
    flex: 1,
    height: 'auto',
    paddingVertical: space.xxs / 2
  },
  iconRight: {
    paddingLeft: space.s
  }
})
