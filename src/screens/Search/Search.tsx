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
import EmptyView from './components/EmptyView'
import { useDispatch } from 'react-redux'
import { closeModal, onModal } from 'stores/modal'
import { updateUsers } from 'stores/global'

const Search: FC<ScreenProps<'Search'>> = ({ route }) => {
  const keySearch = route.params.keySearch
  const dispatch = useDispatch()
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
      dispatch<any>(updateUsers(res))
      setData(res)
    } catch (error) {
      dispatch<any>(
        onModal({
          display: true,
          title: 'Error',
          subTitle: 'An error occurred, please try again later.'
        })
      )
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
    const { full_name, profile_pic_url, is_verified } = item

    const handleViewProfile = () => {
      dispatch<any>(closeModal())
      console.log('handle View Profile')
    }

    const handleFollow = () => {
      dispatch<any>(closeModal())
      console.log('handle Follow')
    }

    const handleUser = () => {
      dispatch<any>(
        onModal({
          display: true,
          title: 'Information',
          image: { uri: profile_pic_url, isVerify: is_verified },
          subTitle: full_name,
          button: [
            {
              title: 'View profile',
              onPress: handleViewProfile
            },
            {
              title: 'Follow',
              onPress: handleFollow
            }
          ]
        })
      )
    }
    return <UserItem key={item.id} data={item} onPress={handleUser} />
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
          ListEmptyComponent={<EmptyView />}
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
