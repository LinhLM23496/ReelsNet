import { StyleSheet, View } from 'react-native'
import React from 'react'
import { PostData } from 'api/posts/types'
import { Icon, Row, Text } from 'components'
import { convertNumberToShortNumber } from 'lib'
import moment from 'moment'
import { color, colorRange, space } from 'themes'
import { IconComponent } from 'components/Icon/Icon'

type Props = {
  data: PostData
}

type DataType = {
  icon: keyof typeof IconComponent
  count: number
  color: string
}

const ContentItem = ({ data }: Props) => {
  const {
    caption_text,
    taken_at,
    like_count,
    comment_count,
    view_count,
    play_count,
    is_video
  } = data
  const DATA: DataType[] = [
    {
      icon: 'heart',
      count: like_count,
      color: color.danger
    },
    {
      icon: 'comment',
      count: comment_count,
      color: colorRange.primary[400]
    },
    {
      icon: 'view',
      count: is_video ? play_count : view_count,
      color: colorRange.pink[400]
    }
  ]
  return (
    <View style={styles.container}>
      <Row justifyContent="space-between" alignItems="flex-start">
        <Row gap="s">
          {DATA.map(({ icon, count, color }) => (
            <View key={icon} style={styles.action}>
              <Icon name={icon} size="s" color={color} />
              <Text size="s">{convertNumberToShortNumber(count)}</Text>
            </View>
          ))}
        </Row>
        <Text size="s" color={colorRange.gray[400]}>
          {moment(taken_at).fromNow()}
        </Text>
      </Row>
      <Text fontWeight="500" size="l" numberOfLines={2}>
        {caption_text}
      </Text>
    </View>
  )
}

export default React.memo(ContentItem)

const styles = StyleSheet.create({
  container: {
    marginHorizontal: space.s,
    gap: space.xs,
    marginBottom: space.s
  },
  action: {
    alignItems: 'center'
  }
})
