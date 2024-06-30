import { BottomSheetModalProvider } from '@gorhom/bottom-sheet'
import { MainNavigation } from 'navigation'
import React from 'react'
import { StatusBar, StyleSheet } from 'react-native'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { enableScreens } from 'react-native-screens'
import ReduxProvider from 'stores'

enableScreens(false)

function App(): React.JSX.Element {
  return (
    <GestureHandlerRootView style={styles.container}>
      <BottomSheetModalProvider>
        <SafeAreaProvider>
          <ReduxProvider>
            <StatusBar translucent backgroundColor="transparent" />
            <MainNavigation />
          </ReduxProvider>
        </SafeAreaProvider>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1 }
})

export default App
