import { Image, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { avatarSize, color, space } from 'themes'
import { Text } from 'components'

const sourceAvatar =
  'https://hoanghamobile.com/tin-tuc/wp-content/uploads/2024/04/anh-avatar-dep-cho-con-gai-ngau-1.jpg'

const UserItem = () => {
  return (
    <TouchableOpacity activeOpacity={0.8} style={styles.container}>
      <Image source={{ uri: sourceAvatar }} style={styles.avatar} />
      <Text>UserItem</Text>
    </TouchableOpacity>
  )
}

export default UserItem

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: space.s,
    backgroundColor: color.white,
    borderRadius: space.xxs,
    gap: space.s
  },
  avatar: {
    width: avatarSize.xs,
    height: 'auto',
    aspectRatio: 1,
    borderRadius: avatarSize.xs
  }
})
