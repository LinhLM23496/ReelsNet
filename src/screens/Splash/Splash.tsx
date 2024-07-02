import { ActivityIndicator, StyleSheet, View } from 'react-native'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getRandomPosts } from 'stores/posts'
import { NavigationService, Route } from 'navigation'
import { onModal } from 'stores/modal'
import { getRandomUsers, selectGlobal } from 'stores/global'

const Splash = () => {
  const dispatch = useDispatch()
  const { users } = useSelector(selectGlobal)

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!users?.length) {
          await dispatch<any>(getRandomUsers())
        }
        await dispatch<any>(getRandomPosts())
        NavigationService.replace(Route.Main)
      } catch (error: any) {
        dispatch<any>(
          onModal({
            display: true,
            title: 'Error',
            subTitle: 'An error occurred, please try again.',
            content: error.message,
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
