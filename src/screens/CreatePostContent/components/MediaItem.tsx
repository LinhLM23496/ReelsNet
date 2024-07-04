import { Image, Text, View } from 'react-native'
import React from 'react'
import { formatTime } from 'lib'
import { Props } from './MediaItem.types'
import { styles } from './MediaItem.styles'

const MediaItem = ({ data }: Props) => {
  const { uri, type, playableDuration = 0 } = data
  return (
    <View>
      <Image source={{ uri }} resizeMode="contain" style={styles.item} />
      {type === 'video' ? (
        <Text style={styles.time}>{formatTime(playableDuration ?? 0)}</Text>
      ) : null}
    </View>
  )
}

export default React.memo(MediaItem)
