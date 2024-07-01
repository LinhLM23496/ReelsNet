import apiRequest from 'api/apiRequest'
import { PostData } from './types'
import { PagingDataType } from 'api/types'

export const getPosts = (params: {
  username_or_id_or_url: string
  pagination_token?: string | null
}): Promise<PagingDataType<PostData>> =>
  apiRequest.get('/v1.1/posts', { params })

export const getOnePost = async (params: {
  username_or_id_or_url: string
}): Promise<PostData> => {
  const res = await apiRequest.get('/v1.1/posts', { params })
  return res.data.items[0]
}
