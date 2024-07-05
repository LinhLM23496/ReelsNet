import { useCallback, useState } from 'react'
import { Alert, AppState, EmitterSubscription, Platform } from 'react-native'
import {
  CameraRoll,
  PhotoIdentifier,
  cameraRollEventEmitter
} from '@react-native-camera-roll/camera-roll'
import usePermission from './usePermission'
import { isIOS } from 'lib'
import useDidMountEffect from './useDidMountEffect '

export type MediaType = {
  type: string // image, video
  uri: string
  width: number | null
  height: number | null
  filename: string // ABC.png
  name: string // ABC
  extension: string | null // png, mp4
  mineType: string // image/png, video/mp4,
  fileSize: number
  playableDuration?: number | null // for video
}

type GalleryOptions = {
  pageSize?: number
  assetType?: 'Photos' | 'Videos' | 'All'
  isCamera?: boolean
}

type GalleryLogic = {
  media: MediaType[]
  loadNextPageMedia: () => Promise<MediaType[] | undefined>
  isLoading: boolean
  isLoadingNextPage: boolean
  isReloading: boolean
  hasNextPage: boolean
  getUnloadedPictures: () => void
}

const isAboveIOS14 = isIOS && parseInt(String(Platform.Version), 10) >= 14

function convertCameraRollToMediaType(edges: PhotoIdentifier[]): MediaType[] {
  return edges.map(({ node }) => {
    const filename = node.image.filename ?? ''
    const extension = node.image.extension
    const endExtension = '.' + extension
    const name = filename?.includes(endExtension)
      ? filename
      : (filename ?? '') + endExtension
    const type = node.type.split('/')[0]
    const mineType = type + '/' + extension
    return {
      uri: node.image.uri,
      width: node.image.width,
      height: node.image.height,
      filename: filename ?? '',
      fileSize: node.image.fileSize ?? 0,
      type,
      extension,
      name,
      mineType,
      playableDuration: node.image.playableDuration
    }
  })
}

const handleError = (error: any) => {
  if (
    error?.code === 'E_PHOTO_LIBRARY_AUTH_DENIED' ||
    error?.message === 'Permission denied'
  ) {
    return
  }

  Alert.alert('Error', 'Failed to load photos')
}

const useGallery = (props: GalleryOptions): GalleryLogic => {
  const { pageSize = 100, assetType = 'Photos', isCamera } = props
  const { checkMultiPermission } = usePermission()

  const [isLoading, setIsLoading] = useState(false)
  const [isReloading, setIsReloading] = useState(false)
  const [isLoadingNextPage, setIsLoadingNextPage] = useState(false)
  const [hasNextPage, setHasNextPage] = useState(false)
  const [nextCursor, setNextCursor] = useState<string>()
  const [media, setMedia] = useState<MediaType[]>([])

  const paramsGetPhotos: any = {
    first: pageSize,
    assetType,
    include: [
      'fileSize', // This has a large performance impact on iOS.
      'filename', // This has a large performance impact on iOS.
      'fileExtension',
      'imageSize', //  This has a small peformance impact on Android.
      'playableDuration' //  This has a medium peformance impact on Android.
    ]
  }

  const loadNextPageMedia = useCallback(async () => {
    if (isLoading || isLoadingNextPage || isReloading) return

    if (nextCursor) paramsGetPhotos.after = nextCursor

    try {
      nextCursor ? setIsLoadingNextPage(true) : setIsLoading(true)
      await checkPermission()
      const { edges, page_info } = await CameraRoll.getPhotos(paramsGetPhotos)

      const coverMedia = convertCameraRollToMediaType(edges)
      setMedia((prev) => [...prev, ...coverMedia])
      setNextCursor(page_info.end_cursor)
      setHasNextPage(page_info.has_next_page)
      return coverMedia
    } catch (error: any) {
      handleError(error)
    } finally {
      nextCursor ? setIsLoadingNextPage(false) : setIsLoading(false)
    }
  }, [nextCursor, pageSize])

  const getUnloadedPictures = useCallback(async () => {
    try {
      setIsReloading(true)
      const { edges, page_info } = await CameraRoll.getPhotos(paramsGetPhotos)
      const newPhotos = convertCameraRollToMediaType(edges)
      setMedia(newPhotos)
      setNextCursor(page_info.end_cursor)
      setHasNextPage(page_info.has_next_page)
    } catch (error) {
      handleError(error)
    } finally {
      setIsReloading(false)
    }
  }, [pageSize, media])

  useDidMountEffect(() => {
    const subscription = AppState.addEventListener('change', (nextAppState) => {
      if (nextAppState === 'active') {
        getUnloadedPictures()
      }
    })

    return () => {
      subscription.remove()
    }
  }, [])

  useDidMountEffect(() => {
    let subscription: EmitterSubscription

    const subscript = () => {
      try {
        if (isAboveIOS14) {
          subscription = cameraRollEventEmitter.addListener(
            'onLibrarySelectionChange',
            (_event) => {
              getUnloadedPictures()
            }
          )
        }
      } catch (error: any) {
        handleError(error)
      }
    }

    subscript()

    return () => {
      if (isAboveIOS14 && subscription) {
        subscription.remove()
      }
    }
  }, [getUnloadedPictures])

  const checkPermission = async () => {
    try {
      const options: any = ['library']
      isCamera && options.push('camera')
      await checkMultiPermission(options)
      return true
    } catch (error: any) {
      throw { code: 'E_PHOTO_LIBRARY_AUTH_DENIED' }
    }
  }

  return {
    media,
    loadNextPageMedia,
    isLoading,
    isLoadingNextPage,
    isReloading,
    hasNextPage,
    getUnloadedPictures
  }
}

export default useGallery
