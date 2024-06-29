import { FlatList, Keyboard, StyleSheet, View } from 'react-native'
import React, { FC, useState } from 'react'
import { NavigationService, ScreenProps } from 'navigation'
import { Button, Input, Row, SafeView } from 'components'
import UserItem from './components/UserItem'
import { space } from 'themes'

const Search: FC<ScreenProps<'Search'>> = ({ route }) => {
  const keySearch = route.params.keySearch

  const [search, setSearch] = useState(keySearch)

  const handleEndSearch = (text: string) => {
    if (!text) return
    Keyboard.dismiss()
  }

  const handleBack = () => {
    NavigationService.goBack()
  }

  const renderItem = ({ index }: any) => {
    return <UserItem key={index.toString()} />
  }

  const renderSeparator = () => {
    return <View style={styles.separator} />
  }
  return (
    <SafeView style={styles.container}>
      <Row gap="s" style={styles.header}>
        <Button
          variant="ghost"
          iconName="arrow-left"
          spacing="xxs"
          onPress={handleBack}
        />
        <Input
          value={search}
          onChangeText={setSearch}
          placeholder="search for username..."
          showClear
          iconName="search"
          onSubmitEditing={() => handleEndSearch(search)}
          onPressIcon={() => handleEndSearch(search)}
          enablesReturnKeyAutomatically
        />
      </Row>
      <FlatList
        data={new Array(50).fill(0)}
        renderItem={renderItem}
        ItemSeparatorComponent={renderSeparator}
        contentContainerStyle={styles.contentList}
      />
    </SafeView>
  )
}

export default Search

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  header: {
    paddingHorizontal: space.s,
    paddingVertical: space.s
  },
  separator: {
    height: space.m
  },
  contentList: {
    paddingHorizontal: space.s
  }
})
