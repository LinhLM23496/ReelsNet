import { StyleSheet } from 'react-native'
import React, { ReactNode } from 'react'
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import ReduxProvider from 'stores'

type Props = {
  children: ReactNode
}

const Provider = ({ children }: Props) => {
  return (
    <GestureHandlerRootView style={styles.container}>
      <BottomSheetModalProvider>
        <SafeAreaProvider>
          <ReduxProvider>{children}</ReduxProvider>
        </SafeAreaProvider>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  )
}

export default Provider

const styles = StyleSheet.create({
  container: { flex: 1 }
})
