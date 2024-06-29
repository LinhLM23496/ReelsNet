import { IconSizeType, iconSize as IconSize } from 'themes'

export const convertIconSize = (size: IconSizeType): number => IconSize[size]
