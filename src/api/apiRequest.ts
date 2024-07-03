import axios, { AxiosResponse } from 'axios'

const BASE_URL = process.env.BASE_URL
const KEY = process.env.KEY
const HOST = process.env.HOST

const apiRequest = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'x-rapidapi-key': KEY,
    'x-rapidapi-host': HOST
  }
})

apiRequest.interceptors.request.use(async (config: any) => {
  if (config?.customUrl) {
    config.baseURL = config.customUrl
  }
  if (config?.data instanceof FormData) {
    config.headers['Content-Type'] = 'multipart/form-data'
  }

  return config
})

apiRequest.interceptors.response.use(
  (response: AxiosResponse) => {
    const { status, data } = response

    if ([200, 201].includes(status)) {
      return data
    }
    throw response
  },
  (error) => {
    const {
      response: { data }
    } = error

    throw data
  }
)

export default apiRequest
