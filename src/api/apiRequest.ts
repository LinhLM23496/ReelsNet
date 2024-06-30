import axios, { AxiosResponse } from 'axios'
// import { STORAGE_KEY, getStorage } from 'stores'

const apiRequest = axios.create({
  baseURL: 'https://instagram-scraper-api2.p.rapidapi.com/v1',
  headers: {
    'Content-Type': 'application/json',
    'x-rapidapi-key': '1be8ed855bmsh9c2c0a4a4e17c33p17817cjsn62d96bf544d6',
    'x-rapidapi-host': 'instagram-scraper-api2.p.rapidapi.com'
  }
})

const logStyle =
  'color: black; font-weight: bold; font-size:12px; background-color: #FF4242;color: #FFFFFF; padding: 4px; border-radius: 2px'

const successStyle =
  'color: black; font-weight: bold; font-size:12px; background-color: #fff;color: #000; padding: 4px; border-radius: 2px'

apiRequest.interceptors.request.use(async (config: any) => {
  // const { token } = getStorage(STORAGE_KEY.TOKEN)
  // const accessToken = token?.accessToken || ''

  // if (accessToken) {
  //   config.headers.Authorization = 'Bearer ' + accessToken
  // }
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
      if (__DEV__) {
        console.log(
          `%c[API] [${response.config.method}] [${response.config.url}]\n`,
          successStyle,
          data
        )
      }

      return data
    }
    throw response
  },
  (error) => {
    const {
      config,
      response: { status, data }
    } = error

    if (__DEV__) {
      console.log(
        `%c Lỗi nè - [${config?.url}] - [${status}]\n`,
        logStyle,
        data
      )
    }

    throw data
  }
)

export default apiRequest
