import React from 'react'
import { Path, Svg } from 'react-native-svg'
import { IconSizeType, color as _color, iconSize } from 'themes'

type Props = {
  size?: IconSizeType
  color?: string
}

const IconHeart = ({ size = 'm', color = _color.black }: Props) => {
  const newSize = iconSize[size]
  return (
    <Svg height={newSize} width={newSize} viewBox="0 0 29 28" fill="none">
      <Path
        d="M14.9993 20.67C14.8093 20.67 14.6193 20.6 14.4693 20.45L7.9493 13.93C6.8893 12.87 6.8893 11.13 7.9493 10.07L14.4693 3.55002C14.7593 3.26002 15.2393 3.26002 15.5293 3.55002C15.8193 3.84002 15.8193 4.32002 15.5293 4.61002L9.0093 11.13C8.5293 11.61 8.5293 12.39 9.0093 12.87L15.5293 19.39C15.8193 19.68 15.8193 20.16 15.5293 20.45C15.3793 20.59 15.1893 20.67 14.9993 20.67Z"
        fill={color}
      />
      <Path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M3.85084 13.5314C2.599 9.62304 4.062 5.15588 8.16517 3.83404C10.3235 3.13754 12.7058 3.54821 14.5002 4.89804C16.1977 3.58554 18.6675 3.14221 20.8235 3.83404C24.9267 5.15588 26.399 9.62304 25.1483 13.5314C23.2 19.7264 14.5002 24.498 14.5002 24.498C14.5002 24.498 5.8645 19.7987 3.85084 13.5314Z"
        fill={color}
        fillOpacity="0.1"
        stroke={color}
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <Path
        d="M19.167 7.81668C20.4153 8.22035 21.2973 9.33451 21.4035 10.6423"
        stroke={color}
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </Svg>
  )
}

export default IconHeart
