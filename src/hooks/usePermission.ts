import { isIOS } from 'lib'
import { PermissionsAndroid, Platform } from 'react-native'
import {
  checkMultiple,
  PERMISSIONS,
  requestMultiple
} from 'react-native-permissions'

const _PERMISSIONS: Record<
  'camera' | 'microphone' | 'library' | 'location',
  any
> = {
  camera: {
    ios: PERMISSIONS.IOS.CAMERA,
    android: PERMISSIONS.ANDROID.CAMERA
  },
  microphone: {
    ios: PERMISSIONS.IOS.MICROPHONE,
    android: PERMISSIONS.ANDROID.RECORD_AUDIO
  },
  library: {
    ios: PERMISSIONS.IOS.PHOTO_LIBRARY,
    android: PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE
  },
  location: {
    ios: PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
    android: PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION
  }
}

export type TMultiPermission = keyof typeof _PERMISSIONS

const usePermission = () => {
  const checkMultiPermission = async (
    permissionArr: TMultiPermission[],
    deniedCheck?: boolean
  ) => {
    try {
      const permission = permissionArr.map((r) => _PERMISSIONS[r][Platform.OS])
      const grant = await checkMultiple(permission)
      const check = ['blocked', ...(deniedCheck ? ['denied'] : [])]
      const errorPermissions = permissionArr.filter((_, index) =>
        check.includes(Object.values(grant)[index])
      )

      if (errorPermissions.length) {
        throw {
          message: 'Permission',
          permission: errorPermissions
        }
      }

      return true
    } catch (error) {
      throw error
    }
  }

  const requestMultiPermission = async (permissionArr: TMultiPermission[]) => {
    try {
      const isNotRequest =
        !isIOS && parseInt(String(Platform.Version), 10) >= 33
      await checkMultiPermission(permissionArr)

      const permission = permissionArr
        .filter((p) => !(p === 'library' && isNotRequest))
        .map((r) => _PERMISSIONS[r][Platform.OS])

      if (!permission.length) return true

      const resultRequest = isIOS
        ? await requestMultiple(permission)
        : await PermissionsAndroid.requestMultiple(permission)

      const resultRequestArr = Object.values(resultRequest)

      if (
        resultRequestArr.includes('blocked') ||
        resultRequestArr.includes('denied') ||
        resultRequestArr.includes('never_ask_again')
      ) {
        throw new Error('Permission')
      }
      return true
    } catch (error) {
      throw error
    }
  }

  return {
    checkMultiPermission,
    requestMultiPermission
  }
}

export default usePermission
