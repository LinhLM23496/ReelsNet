import {
  brightness,
  concatColorMatrices,
  contrast,
  hueRotate,
  invert,
  saturate,
  sepia,
  tint
} from 'react-native-color-matrix-image-filters'
import { space } from 'themes'
import { FilterType } from './CreatePostFilter.types'

export const snapToInterval = space.width - 3 * space.m
export const cardFull = space.width - 4 * space.m

export const DATA_FILTER: FilterType[] = [
  {
    id: 'matrix-0',
    matrix: concatColorMatrices(),
    title: 'Default'
  },
  {
    id: 'matrix-1',
    matrix: concatColorMatrices(saturate(0)),
    title: 'BlackWhite'
  },
  {
    id: 'matrix-2',
    matrix: concatColorMatrices(sepia(), tint(1.25)),
    title: 'Sepia'
  },
  {
    id: 'matrix-3',
    matrix: concatColorMatrices(saturate(-0.9), contrast(5.2), invert()),
    title: 'Color Matrix'
  },
  {
    id: 'matrix-4',
    matrix: concatColorMatrices(brightness(1.1), hueRotate(45)),
    title: 'BrightHue'
  },
  {
    id: 'matrix-5',
    matrix: concatColorMatrices(saturate(2.0), contrast(1.5)),
    title: 'SatContrast'
  },
  {
    id: 'matrix-6',
    matrix: concatColorMatrices(sepia(), invert(), hueRotate(-90)),
    title: 'SepiaInvHue'
  },
  {
    id: 'matrix-7',
    matrix: concatColorMatrices(brightness(0.8), saturate(-0.5), contrast(3)),
    title: 'DimContrast'
  },
  {
    id: 'matrix-8',
    matrix: concatColorMatrices(invert(), hueRotate(180), brightness(1.2)),
    title: 'InvBright'
  },
  {
    id: 'matrix-9',
    matrix: concatColorMatrices(contrast(2.0), brightness(1.5)),
    title: 'ConBright'
  },
  {
    id: 'matrix-10',
    matrix: concatColorMatrices(saturate(3.0), hueRotate(90)),
    title: 'SatHue'
  }
]
