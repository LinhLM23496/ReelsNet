import { Image, StyleSheet, View } from 'react-native'
import React, { useRef } from 'react'
import { Row, Text } from 'components'
import { avatarSize, color, colorRange, space } from 'themes'
import Video, { VideoRef } from 'react-native-video'

type Props = {
  data: {
    id: string
    title: string
  }
  active: boolean
  isVideo: boolean
}

const imageCover =
  'https://i.pinimg.com/564x/2f/60/6a/2f606ad14bf9171e5f41b42a01b4441f.jpg'
const videoUrl = 'https://www.w3schools.com/html/mov_bbb.mp4'

const PostItem = ({ data, active, isVideo }: Props) => {
  const { title } = data
  const videoRef = useRef<VideoRef>(null)

  return (
    <View style={styles.container}>
      {isVideo ? (
        <Video
          ref={videoRef}
          source={{ uri: videoUrl }}
          paused={!active}
          style={styles.cover}
        />
      ) : (
        <Image source={{ uri: imageCover }} style={styles.cover} />
      )}

      <View style={styles.body}>
        <View>
          <Text size="s" color={colorRange.gray[400]}>
            xx minutes ago
          </Text>
          <Text fontWeight="500" size="l" numberOfLines={2}>
            {title}
          </Text>
        </View>
        <Row justifyContent="space-between">
          <Row gap={'xs'}>
            <Image source={{ uri: imageCover }} style={styles.avatar} />
            <Text>Linh</Text>
          </Row>
          <Row>
            <Text>1h</Text>
          </Row>
        </Row>
      </View>
    </View>
  )
}

export default React.memo(PostItem)

const styles = StyleSheet.create({
  container: {
    marginHorizontal: space.s,
    backgroundColor: color.white,
    borderRadius: space.xxs,
    gap: space.s
  },
  cover: {
    width: '100%',
    height: 'auto',
    aspectRatio: 16 / 9,
    borderRadius: space.xxs
  },
  body: {
    marginHorizontal: space.s,
    gap: space.s,
    marginBottom: space.s
  },
  avatar: {
    width: avatarSize.xs,
    height: 'auto',
    aspectRatio: 1,
    borderRadius: avatarSize.s
  }
})
