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

export type ImageType = {
  id: string
  uri: string
  width: number
  height: number
  name: string // ABC
  filename: string // ABC.png
  type: string // image
  extension: string // png
  mineType?: string // image/png
  fileSize: number
}

type GalleryOptions = {
  pageSize?: number
  assetType?: 'Photos' | 'Videos' | 'All'
  isCamera?: boolean
}

type GalleryLogic = {
  photos?: ImageType[]
  loadNextPagePictures: () => Promise<ImageType[] | undefined>
  isLoading: boolean
  isLoadingNextPage: boolean
  isReloading: boolean
  hasNextPage: boolean
}

const isAboveIOS14 = isIOS && parseInt(String(Platform.Version), 10) >= 14

function convertCameraRollPicturesToImageType(
  edges: PhotoIdentifier[]
): ImageType[] {
  return edges.map((edge) => {
    const filename = edge.node.image.filename
    const fileExtension = edge.node.image.extension
    const extension = fileExtension ?? filename?.split('.').pop() ?? 'png'
    const endExtension = '.' + extension
    const name = filename?.includes(endExtension)
      ? filename
      : (filename ?? '') + endExtension
    const imageType = edge.node.type
    const mineType = imageType + '/' + extension
    return {
      id: edge.node.id,
      uri: edge.node.image.uri,
      width: edge.node.image.width,
      height: edge.node.image.height,
      filename: filename ?? '',
      fileSize: edge.node.image.fileSize ?? 0,
      type: edge.node.type,
      extension,
      name,
      mineType
    }
  })
}

const useGallery = (props?: GalleryOptions): GalleryLogic => {
  const { pageSize = 100, assetType = 'Photos', isCamera } = props || {}

  const { checkMultiPermission } = usePermission()
  const [isLoading, setIsLoading] = useState(false)
  const [isReloading, setIsReloading] = useState(false)
  const [isLoadingNextPage, setIsLoadingNextPage] = useState(false)
  const [hasNextPage, setHasNextPage] = useState(false)
  const [nextCursor, setNextCursor] = useState<string>()
  const [photos, setPhotos] = useState<ImageType[]>([])

  const loadNextPagePictures = useCallback(async () => {
    if (isLoading || isLoadingNextPage) return
    try {
      nextCursor ? setIsLoadingNextPage(true) : setIsLoading(true)
      await checkPermission()
      const { edges, page_info } = await CameraRoll.getPhotos({
        first: pageSize,
        after: nextCursor,
        assetType,
        ...(!isIOS && { include: ['fileSize', 'filename'] })
      })

      const coverPhotos = convertCameraRollPicturesToImageType(edges)
      setPhotos((prev) => [...prev, ...coverPhotos])
      setNextCursor(page_info.end_cursor)
      setHasNextPage(page_info.has_next_page)
      return coverPhotos
    } catch (error: any) {
      if (error?.code === 'E_PHOTO_LIBRARY_AUTH_DENIED') return
      Alert.alert('Error', 'Failed to load photos')
    } finally {
      nextCursor ? setIsLoadingNextPage(false) : setIsLoading(false)
    }
  }, [nextCursor, pageSize, isLoading, isLoadingNextPage])

  const getUnloadedPictures = useCallback(async () => {
    try {
      setIsReloading(true)
      await checkPermission()

      const { edges, page_info } = await CameraRoll.getPhotos({
        first: !photos || photos.length < pageSize ? pageSize : photos.length,
        assetType,
        // Include fileSize only for android since it's causing performance issues on IOS.
        ...(!isIOS && { include: ['fileSize', 'filename'] })
      })

      const newPhotos = convertCameraRollPicturesToImageType(edges)
      setPhotos(newPhotos)

      setNextCursor(page_info.end_cursor)
      setHasNextPage(page_info.has_next_page)
    } catch (error: any) {
      if (
        error?.code === 'E_PHOTO_LIBRARY_AUTH_DENIED' ||
        error?.message === 'Permission denied'
      ) {
        return
      }

      Alert.alert('Error', 'Failed to load photos')
    } finally {
      setIsReloading(false)
    }
  }, [pageSize, photos])

  useDidMountEffect(() => {
    const subscription = AppState.addEventListener('change', (nextAppState) => {
      if (nextAppState === 'active') {
        getUnloadedPictures()
      }
    })

    return () => {
      subscription.remove()
    }
  }, [getUnloadedPictures])

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
        if (
          error?.code === 'E_PHOTO_LIBRARY_AUTH_DENIED' ||
          error?.message === 'Permission denied'
        ) {
          return
        }

        Alert.alert('Error', 'Failed to load photos')
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
    photos,
    loadNextPagePictures,
    isLoading,
    isLoadingNextPage,
    isReloading,
    hasNextPage
  }
}

export default useGallery
