import { IconSizeType, iconSize, SpaceSizeType, space } from 'themes'

export const convertIconSize = (size: IconSizeType): number => iconSize[size]
export const convertSpaceSize = (size: SpaceSizeType): number => space[size]
