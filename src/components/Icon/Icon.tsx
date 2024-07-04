import React from 'react'
import { Props } from './Icon.types'
import {
  IconArrowLeft,
  IconArrowRight,
  IconCamera,
  IconCheck,
  IconClose,
  IconComment,
  IconCopy,
  IconFacebook,
  IconFlash,
  IconHeart,
  IconHistory,
  IconHome,
  IconLocation,
  IconMusic,
  IconPause,
  IconPlay,
  IconPlipCamera,
  IconPlus,
  IconSearch,
  IconSetting,
  IconTag,
  IconTagUser,
  IconView
} from 'assets'
import { View } from 'react-native'

export const IconComponent = {
  'arrow-left': IconArrowLeft,
  plus: IconPlus,
  setting: IconSetting,
  home: IconHome,
  search: IconSearch,
  close: IconClose,
  copy: IconCopy,
  location: IconLocation,
  'arrow-right': IconArrowRight,
  facebook: IconFacebook,
  music: IconMusic,
  tag: IconTag,
  tagUser: IconTagUser,
  view: IconView,
  heart: IconHeart,
  comment: IconComment,
  history: IconHistory,
  camera: IconCamera,
  takePhoto: IconPlipCamera,
  flash: IconFlash,
  check: IconCheck,
  pause: IconPause,
  play: IconPlay
}

const Icon = (props: Props) => {
  const { name, style, ...rest } = props
  const Element = IconComponent[name]
  return (
    <View style={style}>
      <Element {...rest} />
    </View>
  )
}

export default Icon
