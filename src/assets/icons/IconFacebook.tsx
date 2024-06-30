import React from 'react'
import { ClipPath, Defs, G, Path, Rect, Svg } from 'react-native-svg'
import { IconSizeType, color as _color, iconSize } from 'themes'

type Props = {
  size?: IconSizeType
  color?: string
}

const IconFacebook = ({ size = 'm', color = _color.black }: Props) => {
  const newSize = iconSize[size]
  return (
    <Svg height={newSize} width={newSize} viewBox="0 0 24 24" fill="none">
      <G clip-path="url(#clip0_18_19575)">
        <Path
          d="M22 12C22 6.48 17.52 2 12 2C6.48 2 2 6.48 2 12C2 16.84 5.44 20.87 10 21.8V15H8V12H10V9.5C10 7.57 11.57 6 13.5 6H16V9H14C13.45 9 13 9.45 13 10V12H16V15H13V21.95C18.05 21.45 22 17.19 22 12Z"
          fill={color}
        />
      </G>
      <Defs>
        <ClipPath id="clip0_18_19575">
          <Rect width="24" height="24" fill="white" />
        </ClipPath>
      </Defs>
    </Svg>
  )
}

export default IconFacebook
