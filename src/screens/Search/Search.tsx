import {
  ActivityIndicator,
  FlatList,
  Keyboard,
  StyleSheet,
  View
} from 'react-native'
import React, { FC, useEffect, useState } from 'react'
import { NavigationService, ScreenProps } from 'navigation'
import { Button, Input, Row, SafeView } from 'components'
import UserItem from './components/UserItem'
import { space } from 'themes'
import { usersAPI } from 'api'
import { UserData } from 'api/users/types'

const Search: FC<ScreenProps<'Search'>> = ({ route }) => {
  const keySearch = route.params.keySearch
  const [search, setSearch] = useState(keySearch)
  const [data, setData] = useState<UserData[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    fetchData(keySearch)
  }, [])

  const fetchData = async (search_query: string) => {
    try {
      setLoading(true)
      const res = await usersAPI.searchUsers({ search_query })
      setData(res)
    } catch (error) {
    } finally {
      setLoading(false)
    }
  }

  const handleEndSearch = (text: string) => {
    if (!text) return
    Keyboard.dismiss()
    fetchData(text.trim())
  }

  const handleBack = () => {
    NavigationService.goBack()
  }

  const renderItem = ({ item }: { item: UserData }) => {
    return <UserItem key={item.id} data={item} />
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
      {!loading ? (
        <FlatList
          data={data}
          renderItem={renderItem}
          ItemSeparatorComponent={renderSeparator}
          contentContainerStyle={styles.contentList}
        />
      ) : (
        <ActivityIndicator size={'large'} style={styles.loading} />
      )}
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
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})
