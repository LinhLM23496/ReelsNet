import { postsAPI, usersAPI } from 'api'
import { generateRandomString } from 'lib'
import { postsSlice } from './posts.reducer'
import { store } from 'stores/store'

const { setUsers, setPosts, setCurrentIndex, resetPosts } = postsSlice.actions

export const getRandomUsers = () => async (dispatch: any) => {
  const search_query = generateRandomString()
  const response = await usersAPI.searchUsers({ search_query })
  const listUsername = response.map((user: any) => user.username)
  dispatch(setUsers(listUsername))

  return listUsername
}

export const getRandomPosts = () => async (dispatch: any) => {
  const {
    posts,
    currentIndex: _currentIndex,
    users: _users
  } = store.getState().posts
  let users = _users
  let currentIndex = _currentIndex
  if (_currentIndex >= users.length || users.length === 0) {
    users = await dispatch(getRandomUsers())
    currentIndex = 0
  }
  const nextIndex = currentIndex + 3
  const usernames = users.slice(currentIndex, nextIndex)

  const responses = await Promise.allSettled(
    usernames.map((username) =>
      postsAPI.getOnePost({ username_or_id_or_url: username })
    )
  )

  // filter out the successful responses and map the value
  const successfulResponses = responses
    .filter((response) => response.status === 'fulfilled')
    .map((response) => (response as PromiseFulfilledResult<any>).value)

  dispatch(setCurrentIndex(nextIndex))
  dispatch(
    setPosts(
      !currentIndex ? successfulResponses : [...posts, ...successfulResponses]
    )
  )

  return successfulResponses
}

export const refreshRandomPosts = () => async (dispatch: any) => {
  dispatch(resetPosts())
  await dispatch(getRandomPosts())
}
