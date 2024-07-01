import { StyleSheet } from 'react-native'
import { space } from 'themes'

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: space.s
  },
  buttonContinue: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: space.m
  },
  containerContent: {
    gap: space.m,
    paddingHorizontal: 2 * space.m
  }
})
