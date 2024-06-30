import apiRequest from 'api/apiRequest'
import { UserData } from './types'

export const searchUsers = async (params: {
  search_query: string
}): Promise<UserData[]> => {
  const res = await apiRequest.get('/search_users', { params })
  return res.data.items
}
