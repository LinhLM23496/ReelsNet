import React from 'react'
import { Path, Svg } from 'react-native-svg'
import { IconSizeType, color as _color, iconSize } from 'themes'

type Props = {
  size?: IconSizeType
  color?: string
}

const IconView = ({ size = 'm', color = _color.black }: Props) => {
  const newSize = iconSize[size]
  return (
    <Svg height={newSize} width={newSize} viewBox="0 0 29 28" fill="none">
      <Path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M18.1884 14.062C18.1884 16.099 16.5364 17.7498 14.4994 17.7498C12.4624 17.7498 10.8115 16.099 10.8115 14.062C10.8115 12.0238 12.4624 10.373 14.4994 10.373C16.5364 10.373 18.1884 12.0238 18.1884 14.062Z"
        stroke={color}
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <Path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M14.4973 22.5807C18.94 22.5807 23.0035 19.3864 25.2913 14.0617C23.0035 8.73706 18.94 5.54272 14.4973 5.54272H14.502C10.0593 5.54272 5.99584 8.73706 3.70801 14.0617C5.99584 19.3864 10.0593 22.5807 14.502 22.5807H14.4973Z"
        fill={color}
        fillOpacity="0.1"
        stroke={color}
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </Svg>
  )
}

export default IconView
