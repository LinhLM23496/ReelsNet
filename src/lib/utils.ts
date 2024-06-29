import { Platform } from 'react-native'
import { IconSizeType, iconSize, SpaceSizeType, space } from 'themes'

export const convertIconSize = (size: IconSizeType): number => iconSize[size]
export const convertSpaceSize = (size: SpaceSizeType): number => space[size]

export const isIOS = Platform.OS === 'ios'
