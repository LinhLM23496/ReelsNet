import {
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  View
} from 'react-native'
import React, { useRef, useState } from 'react'
import { Icon, Row, Text } from 'components'
import { avatarSize, color, space } from 'themes'
import Video, { VideoRef } from 'react-native-video'
import { ImageType, PostData } from 'api/posts/types'
import ContentItem from './ContentItem'

type Props = {
  data: PostData
  active: boolean
  isVideo: boolean
}

const PostItem = ({ data, active, isVideo }: Props) => {
  const { user, video_url, image_versions, is_video } = data
  const { username, full_name, profile_pic_url } = user ?? {}
  const videoRef = useRef<VideoRef>(null)
  const [isVideoEnd, setIsVideoEnd] = useState(false)

  const handlePlayAgain = () => {
    setIsVideoEnd(false)
    videoRef.current?.seek(0)
  }

  const renderImage = ({ item }: { item: ImageType }) => {
    const { url, width, height } = item
    return (
      <Image
        key={url}
        source={{ uri: url }}
        style={[styles.cover, { aspectRatio: width / height }]}
      />
    )
  }

  return (
    <View style={styles.container}>
      <View>
        {isVideo && !!video_url ? (
          <Video
            ref={videoRef}
            source={{ uri: video_url }}
            paused={!active}
            onEnd={() => setIsVideoEnd(true)}
            style={styles.video}
          />
        ) : (
          <FlatList
            data={image_versions}
            renderItem={renderImage}
            keyExtractor={(item) => item.url}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
          />
        )}

        <Row justifyContent="space-between" gap="s" style={styles.user}>
          {profile_pic_url ? (
            <Image source={{ uri: profile_pic_url }} style={styles.avatar} />
          ) : null}
          <Text fontWeight="500">{full_name ?? username}</Text>
        </Row>
        {is_video && isVideoEnd ? (
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={handlePlayAgain}
            style={styles.playAgain}>
            <Icon name="history" size="xl" color={color.primary} />
            <Text color={color.primary} textAlign="center">
              play again
            </Text>
          </TouchableOpacity>
        ) : null}
      </View>
      <ContentItem data={data} />
    </View>
  )
}

export default React.memo(PostItem)

const styles = StyleSheet.create({
  container: {
    marginHorizontal: space.s,
    backgroundColor: color.white,
    borderRadius: space.xxs,
    gap: space.s,
    overflow: 'hidden'
  },
  video: {
    width: space.width - space.s * 2,
    height: 'auto',
    aspectRatio: 9 / 16,
    borderRadius: space.xxs
  },
  cover: {
    width: space.width - space.s * 2,
    height: 'auto',
    borderRadius: space.xxs
  },
  avatar: {
    width: avatarSize.xs,
    height: 'auto',
    aspectRatio: 1,
    borderRadius: avatarSize.s
  },
  user: {
    position: 'absolute',
    top: space.s,
    left: space.s
  },
  playAgain: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center'
  }
})
