import { Image, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { color } from 'themes'
import { Icon, Text } from 'components'
import { styles } from './UserItem.styles'
import { Props } from './UserItem.types'

const UserItem = ({ data, onPress }: Props) => {
  const { profile_pic_url, username, is_verified } = data

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      style={styles.container}>
      {profile_pic_url ? (
        <View>
          <Image source={{ uri: profile_pic_url }} style={styles.avatar} />
          {is_verified ? (
            <Icon
              size="xs"
              name="check"
              color={color.success}
              style={styles.iconCheck}
            />
          ) : null}
        </View>
      ) : null}
      <Text>{username}</Text>
    </TouchableOpacity>
  )
}

export default React.memo(UserItem)
