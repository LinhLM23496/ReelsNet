import React from 'react'
import { ClipPath, Defs, G, Path, Rect, Svg } from 'react-native-svg'
import { IconSizeType, color as _color, iconSize } from 'themes'

type Props = {
  size?: IconSizeType
  color?: string
}

const IconFlash = ({ size = 'm', color = _color.black }: Props) => {
  const newSize = iconSize[size]
  return (
    <Svg height={newSize} width={newSize} viewBox="0 0 24 24" fill="none">
      <G clip-path="url(#clip0_18_16573)">
        <Path d="M7 2V13H10V22L17 10H13L17 2H7Z" fill={color} />
      </G>
      <Defs>
        <ClipPath id="clip0_18_16573">
          <Rect width="24" height="24" fill="white" />
        </ClipPath>
      </Defs>
    </Svg>
  )
}

export default IconFlash
