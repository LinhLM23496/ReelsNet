import React from 'react'
import Svg, { ClipPath, Defs, G, Path, Rect } from 'react-native-svg'
import { IconSizeType, color as _color, iconSize } from 'themes'

type Props = {
  size?: IconSizeType
  color?: string
}

const IconPlipCamera = ({ size = 'm', color = _color.black }: Props) => {
  const newSize = iconSize[size]
  return (
    <Svg height={newSize} width={newSize} viewBox="0 0 24 24" fill="none">
      <G clip-path="url(#clip0_197_6518)">
        <Path
          d="M20 5H16.83L15 3H9L7.17 5H4C2.9 5 2 5.9 2 7V19C2 20.1 2.9 21 4 21H20C21.1 21 22 20.1 22 19V7C22 5.9 21.1 5 20 5ZM12 18C9.24 18 7 15.76 7 13H5L7.5 10.5L10 13H8C8 15.21 9.79 17 12 17C12.58 17 13.13 16.87 13.62 16.65L14.36 17.39C13.65 17.76 12.86 18 12 18ZM16.5 15.5L14 13H16C16 10.79 14.21 9 12 9C11.42 9 10.87 9.13 10.38 9.35L9.64 8.62C10.35 8.24 11.14 8 12 8C14.76 8 17 10.24 17 13H19L16.5 15.5Z"
          fill={color}
        />
      </G>
      <Defs>
        <ClipPath id="clip0_197_6518">
          <Rect width="24" height="24" fill="white" />
        </ClipPath>
      </Defs>
    </Svg>
  )
}

export default IconPlipCamera
