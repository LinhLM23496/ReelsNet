import React from 'react'
import { Path, Svg } from 'react-native-svg'
import { IconSizeType, color as _color, iconSize } from 'themes'

type Props = {
  size?: IconSizeType
  color?: string
}

const IconComment = ({ size = 'm', color = _color.black }: Props) => {
  const newSize = iconSize[size]
  return (
    <Svg height={newSize} width={newSize} viewBox="0 0 29 28" fill="none">
      <Path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M22.7496 22.2482C19.1841 25.8141 13.9044 26.5845 9.58383 24.5864C8.946 24.3296 8.42307 24.122 7.92594 24.122C6.54124 24.1302 4.8177 25.4729 3.92193 24.5782C3.02615 23.6823 4.36981 21.9574 4.36981 20.5643C4.36981 20.0671 4.17049 19.5535 3.91372 18.9145C1.91464 14.5946 2.68613 9.31315 6.25164 5.74842C10.8032 1.19518 18.198 1.19518 22.7496 5.74725C27.3094 10.3075 27.3012 17.6961 22.7496 22.2482Z"
        fill={color}
        fillOpacity="0.1"
        stroke={color}
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <Path
        d="M19.0957 14.4818H19.1062"
        stroke={color}
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <Path
        d="M14.4189 14.4818H14.4294"
        stroke={color}
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <Path
        d="M9.74117 14.4818H9.75167"
        stroke={color}
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </Svg>
  )
}

export default IconComment
