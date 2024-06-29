import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useSelector } from 'react-redux'
import { selectGlobal } from 'stores/global/global.selectors'

type Props = {}

const Home = (props: Props) => {
  const global = useSelector(selectGlobal)
  console.log('global', global)
  return (
    <View>
      <Text>Home</Text>
    </View>
  )
}

export default Home

const styles = StyleSheet.create({})
