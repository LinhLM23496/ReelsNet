import { convertIconSize } from 'lib'
import React from 'react'
import { ClipPath, Defs, G, Path, Rect, Svg } from 'react-native-svg'
import { IconSizeType, color as _color } from 'themes'

type Props = {
  size?: IconSizeType
  color?: string
}

const IconClose = ({ size = 'm', color = _color.black }: Props) => {
  const newSize = convertIconSize(size)
  return (
    <Svg height={newSize} width={newSize} viewBox="0 0 24 24" fill="none">
      <G clip-path="url(#clip0_18_18875)">
        <Path
          d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41Z"
          fill={color}
        />
      </G>
      <Defs>
        <ClipPath id="clip0_18_18875">
          <Rect width="24" height="24" fill="white" />
        </ClipPath>
      </Defs>
    </Svg>
  )
}

export default IconClose
