import { Image, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { avatarSize, color, space } from 'themes'
import { Text } from 'components'
import { UserData } from 'api/users/types'

type Props = {
  data: UserData
}

const UserItem = ({ data }: Props) => {
  const { profile_pic_url, username } = data

  return (
    <TouchableOpacity activeOpacity={0.8} style={styles.container}>
      {profile_pic_url ? (
        <Image source={{ uri: profile_pic_url }} style={styles.avatar} />
      ) : null}
      <Text>{username}</Text>
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
