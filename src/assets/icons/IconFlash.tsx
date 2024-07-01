import React from 'react'
import { Path, Svg } from 'react-native-svg'
import { IconSizeType, color as _color, iconSize } from 'themes'

type Props = {
  size?: IconSizeType
  color?: string
}

const IconFlash = ({ size = 'm', color = _color.black }: Props) => {
  const newSize = iconSize[size]
  return (
    <Svg height={newSize} width={newSize} viewBox="0 0 24 24" fill="none">
      <Path
        d="M19.704 2.063L6 19h8l-1.97 10.827a.148.148 0 00.084.16.147.147 0 00.18-.046L26 13h-8l1.979-10.828a.153.153 0 00-.221-.155.151.151 0 00-.054.046z"
        stroke={color}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  )
}

export default IconFlash
