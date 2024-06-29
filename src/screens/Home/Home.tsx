import { StyleSheet, View } from 'react-native'
import React from 'react'
import { NavigationBar, Text } from 'components'

const Home = () => {
  return (
    <View>
      <NavigationBar title="Home" />
      <Text>Home</Text>
    </View>
  )
}

export default Home

const styles = StyleSheet.create({})
