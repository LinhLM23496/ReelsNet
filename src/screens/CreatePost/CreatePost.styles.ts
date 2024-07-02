import { StyleSheet } from 'react-native'
import { space } from 'themes'

export const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  buttonContinue: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: space.m
  },
  body: {
    flex: 1,
    alignItems: 'center'
  },
  item: {
    flex: 1,
    width: '80%',
    height: 'auto'
  },
  footer: {
    paddingHorizontal: space.m,
    marginTop: space.s
  },
  empty: {
    flex: 1
  }
})
