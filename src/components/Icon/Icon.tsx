import React from 'react'
import { Props } from './Icon.types'
import {
  IconArrowLeft,
  IconArrowRight,
  IconCamera,
  IconClose,
  IconComment,
  IconCopy,
  IconFacebook,
  IconHeart,
  IconHistory,
  IconHome,
  IconLocation,
  IconMusic,
  IconPlus,
  IconSearch,
  IconSetting,
  IconTag,
  IconTagUser,
  IconView
} from 'assets'

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
  camera: IconCamera
}

const Icon = (props: Props) => {
  const { name, ...rest } = props
  const Element = IconComponent[name]
  return <Element {...rest} />
}

export default Icon
