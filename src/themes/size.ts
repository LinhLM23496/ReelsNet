import { Dimensions } from 'react-native'

export type AvatarSizeType = 'xxs' | 'xs' | 's' | 'm' | 'l' | 'xl' | 'xxl'
export type IconSizeType = 'xxs' | 'xs' | 's' | 'm' | 'l' | 'xl' | 'xxl' | '3xl'
export type FontSizeType = 'xxs' | 'xs' | 's' | 'm' | 'l' | 'xl' | 'xxl' | '3xl'
export type SpaceSizeType =
  | 'width'
  | 'height'
  | 'half_width'
  | 'half_height'
  | 'xxs'
  | 'xs'
  | 's'
  | 'm'
  | 'l'
  | 'xl'
  | 'xxl'
  | '3xl'

const { width, height } = Dimensions.get('window')
const baseRatioSize = 400 // why 400? because ... ask Giang Ca and me
const ratio = width / baseRatioSize
// const baseUnit = 8;

export const space = {
  width,
  height,
  half_width: Math.round(width / 2),
  half_height: Math.round(height / 2),
  /**
   ** xxs => fontsize is 4
   */
  xxs: Math.round(4 * ratio),
  /**
   ** xs => spaceSize is 8
   */
  xs: Math.round(8 * ratio),
  /**
   ** s => spaceSize is 12
   */
  s: Math.round(12 * ratio),
  /**
   ** m => spaceSize is 16
   */
  m: Math.round(16 * ratio),
  /**
   * l => spaceSize is 20
   */
  l: Math.round(20 * ratio),
  /**
   * xl => spaceSize is 24
   */
  xl: Math.round(24 * ratio),
  /**
   * xxl => spaceSize is 32
   */
  xxl: Math.round(32 * ratio),
  /**
   * 3xl => spaceSize is 40
   */
  '3xl': Math.round(40 * ratio)
}

export const fontSize = {
  /**
   ** xxs => fontsize is 8
   */
  xxs: Math.round(8 * ratio),
  /**
   ** xs => fontsize is 10
   */
  xs: Math.round(10 * ratio),
  /**
   ** s => fontsize is 12
   */
  s: Math.round(12 * ratio),
  /**
   ** m => fontsize is 14
   */
  m: Math.round(14 * ratio),
  /**
   ** l => fontsize is 16
   */
  l: Math.round(16 * ratio),
  /**
   ** xl => fontsize is 24
   */
  xl: Math.round(24 * ratio),
  /**
   ** xxl => fontsize is 30
   */
  xxl: Math.round(30 * ratio),
  /**
   ** 3xl => fontsize is 36
   */
  '3xl': Math.round(36 * ratio),
  /**
   ** 4xl => fontsize is 40
   */
  '4xl': Math.round(40 * ratio)
}

export const iconSize = {
  /**
   ** xxs => iconSize is 12
   */
  xxs: Math.round(12 * ratio),
  /**
   ** xs => iconSize is 16
   */
  xs: Math.round(16 * ratio),
  /**
   ** s => iconSize is 20
   */
  s: Math.round(20 * ratio),
  /**
   ** m => iconSize is 24
   */
  m: Math.round(24 * ratio),
  /**
   ** l => iconSize is 28
   */
  l: Math.round(28 * ratio),
  /**
   ** xl => iconSize is 32
   */
  xl: Math.round(32 * ratio),
  /**
   ** xxl => iconSize is 36
   */
  xxl: Math.round(36 * ratio),
  /**
   ** 3xl => iconSize is 64
   */
  '3xl': Math.round(64 * ratio)
}

export const avatarSize = {
  /**
   ** xxs => avatarSize is 24
   */
  xxs: Math.round(24 * ratio),
  /**
   ** xs => avatarSize is 32
   */
  xs: Math.round(32 * ratio),
  /**
   ** s => avatarSize is 40
   */
  s: Math.round(40 * ratio),
  /**
   ** m => avatarSize is 56
   */
  m: Math.round(56 * ratio),
  /**
   ** l => avatarSize is 80
   */
  l: Math.round(80 * ratio),
  /**
   ** xl => avatarSize is 112
   */
  xl: Math.round(112 * ratio),
  /**
   ** xxl => avatarSize is 156
   */
  xxl: Math.round(156 * ratio)
}

export const DEFAULT_SNAP = Math.round(space.height * 0.6)

export const BUTTON_ICON_SIZE = Math.round(iconSize.m + space.xs * 2)

export const HEIGHT_BOTTOM_BAR = Math.round(48 * ratio)
export const HEIGHT_NIVAGATION_BAR = Math.round(56 * ratio)
