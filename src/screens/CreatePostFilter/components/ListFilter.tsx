import { FlatList, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { DATA_FILTER } from '../contants'
import { images } from 'assets'
import { ColorMatrix } from 'react-native-color-matrix-image-filters'
import { Text } from 'components'
import { FilterType } from '../CreatePostFilter.types'
import { styles } from './ListFilter.styles'
import { Props } from './ListFilter.types'

const ListFilter = ({ onPress }: Props) => {
  const renderFilter = ({ item }: { item: FilterType }) => {
    const { id, matrix, title } = item
    return (
      <TouchableOpacity
        key={id}
        activeOpacity={0.8}
        onPress={() => onPress(item)}
        style={styles.containerItemFilter}>
        <ColorMatrix matrix={matrix}>
          <Image
            source={images.parrot}
            resizeMode="contain"
            style={styles.itemFilter}
          />
        </ColorMatrix>
        <Text textAlign="center" numberOfLines={1} adjustsFontSizeToFit>
          {title}
        </Text>
      </TouchableOpacity>
    )
  }
  return (
    <FlatList
      horizontal
      data={DATA_FILTER}
      keyExtractor={(item) => item.id}
      renderItem={renderFilter}
      style={styles.listFilter}
      contentContainerStyle={styles.containerContentFilter}
      showsHorizontalScrollIndicator={false}
    />
  )
}

export default React.memo(ListFilter)
