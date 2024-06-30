import axios, { AxiosResponse } from 'axios'

const baseURL = 'https://instagram-scraper-api2.p.rapidapi.com'
const apiRequest = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
    'x-rapidapi-key': '1be8ed855bmsh9c2c0a4a4e17c33p17817cjsn62d96bf544d6',
    'x-rapidapi-host': 'instagram-scraper-api2.p.rapidapi.com'
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
