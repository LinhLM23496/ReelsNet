import React from 'react'
import { Path, Svg } from 'react-native-svg'
import { IconSizeType, color as _color, iconSize } from 'themes'

type Props = {
  size?: IconSizeType
  color?: string
}

const IconHome = ({ size = 'm', color = _color.black }: Props) => {
  const newSize = iconSize[size]
  return (
    <Svg height={newSize} width={newSize} viewBox="0 0 24 24" fill="none">
      <Path
        d="M17.5999 22.5601H6.39985C4.57984 22.5601 2.91985 21.1601 2.61985 19.3601L1.28984 11.4001C1.07984 10.1601 1.67985 8.57011 2.66985 7.78011L9.59986 2.23006C10.9399 1.15006 13.0498 1.16007 14.3998 2.24007L21.3299 7.78011C22.3099 8.57011 22.9099 10.1601 22.7099 11.4001L21.3799 19.3601C21.0799 21.1301 19.3899 22.5601 17.5999 22.5601ZM11.9899 2.94008C11.4599 2.94008 10.9298 3.10005 10.5398 3.41005L3.60985 8.9601C3.03985 9.4201 2.64986 10.4401 2.76986 11.1601L4.09986 19.1201C4.27986 20.1701 5.32984 21.0601 6.39985 21.0601H17.5999C18.6699 21.0601 19.7198 20.1701 19.8998 19.1101L21.2298 11.1501C21.3498 10.4301 20.9499 9.40009 20.3899 8.95009L13.4599 3.41005C13.0599 3.10005 12.5299 2.94008 11.9899 2.94008Z"
        fill={color}
      />
      <Path
        d="M12 16.25C10.21 16.25 8.75 14.79 8.75 13C8.75 11.21 10.21 9.75 12 9.75C13.79 9.75 15.25 11.21 15.25 13C15.25 14.79 13.79 16.25 12 16.25ZM12 11.25C11.04 11.25 10.25 12.04 10.25 13C10.25 13.96 11.04 14.75 12 14.75C12.96 14.75 13.75 13.96 13.75 13C13.75 12.04 12.96 11.25 12 11.25Z"
        fill={color}
      />
    </Svg>
  )
}

export default IconHome
