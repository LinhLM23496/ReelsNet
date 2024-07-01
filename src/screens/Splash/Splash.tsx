import { ActivityIndicator, StyleSheet, View } from 'react-native'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { getRandomPosts, getRandomUsers } from 'stores/posts'
import { NavigationService, Route } from 'navigation'
import { onModal } from 'stores/modal'

const Splash = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch<any>(getRandomUsers())
        await dispatch<any>(getRandomPosts())
        NavigationService.replace(Route.Main)
      } catch (error) {
        dispatch<any>(
          onModal({
            display: true,
            title: 'Error',
            subTitle: 'An error occurred, please try again.',
            onClose: fetchData,
            button: [
              {
                title: 'Retry',
                onPress: fetchData
              }
            ]
          })
        )
      }
    }
    fetchData()
  }, [])

  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" />
    </View>
  )
}

export default Splash

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})
