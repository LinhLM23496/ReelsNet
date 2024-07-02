import { usersAPI } from 'api'
import { generateRandomString } from 'lib'
import { globalSlice } from './global.reducer'
import { UserData } from 'api/users/types'

const { setUsers, resetUsers: _resetUsers } = globalSlice.actions

export const getRandomUsers = () => async (dispatch: any) => {
  const search_query = generateRandomString()
  const response = await usersAPI.searchUsers({ search_query })
  const listUsername = response.map((user: any) => user.username)
  dispatch(setUsers(listUsername))

  return listUsername
}

export const updateUsers = (users: UserData[]) => (dispatch: any) => {
  const listUsername = users.map((user: any) => user.username)
  dispatch(setUsers(listUsername))

  return listUsername
}

export const resetUsers = () => (dispatch: any) => {
  dispatch(_resetUsers())
}
