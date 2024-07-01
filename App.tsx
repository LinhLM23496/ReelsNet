import Provider from 'Provider'
import { ModalGlobal } from 'components'
import { MainNavigation } from 'navigation'
import React from 'react'
import { StatusBar } from 'react-native'
import { enableScreens } from 'react-native-screens'

enableScreens(false)

function App(): React.JSX.Element {
  return (
    <Provider>
      <StatusBar translucent backgroundColor="transparent" />
      <MainNavigation />
      <ModalGlobal />
    </Provider>
  )
}

export default App
