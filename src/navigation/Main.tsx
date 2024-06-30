import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import NavigationService, { RootStackParamList } from './NavigationService'
import Route from './Route'
import BottomTabNavigator from './BottomTabNavigator'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

const { Navigator, Screen, Group } =
  createNativeStackNavigator<RootStackParamList>()

const Main = () => {
  const initialRouteName = 'Main'

  return (
    <NavigationContainer ref={NavigationService.navigationRef}>
      <Navigator
        initialRouteName={initialRouteName}
        screenOptions={{
          headerShown: false,
          animation: 'slide_from_right'
        }}>
        <Screen name={Route.Main.name} component={BottomTabNavigator} />
        <Screen {...Route.Search} />
        <Group
          screenOptions={{
            presentation: 'modal',
            animation: 'slide_from_bottom'
          }}>
          <Screen {...Route.CreatePost} />
        </Group>
        <Screen {...Route.CreatePostContent} />
      </Navigator>
    </NavigationContainer>
  )
}

export default Main
