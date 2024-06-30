import { View } from 'react-native'
import React from 'react'
import { color, iconSize, space } from 'themes'
import { Text } from 'components'
import { Props } from './Ratio.types'
import { styles } from './Ratio.styles'

const Ratio = (props: Props) => {
  const { active, number, size: _size = 's', fontSize = 's', style } = props
  const size = iconSize[_size]
  const borderColor = number
    ? color.black
    : active
    ? color.primary
    : color.white
  const backgroundColor = active ? color.white : color.blur
  const padding = number ? 0 : space.xxs / 1.5

  return (
    <View
      style={[
        styles.container,
        { width: size, borderColor, backgroundColor },
        style
      ]}>
      <View style={[styles.dot, { padding }]}>
        {number ? (
          <Text size={fontSize}>{number}</Text>
        ) : active ? (
          <View style={styles.dotActive} />
        ) : null}
      </View>
    </View>
  )
}

export default Ratio
