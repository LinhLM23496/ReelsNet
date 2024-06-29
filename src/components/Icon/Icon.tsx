import React from 'react'
import { Props } from './Icon.types'
import {
  IconArrowLeft,
  IconClose,
  IconHome,
  IconPlus,
  IconSearch,
  IconSetting
} from 'assets'

export const IconComponent = {
  'arrow-left': IconArrowLeft,
  plus: IconPlus,
  setting: IconSetting,
  home: IconHome,
  search: IconSearch,
  close: IconClose
}

const Icon = (props: Props) => {
  const { name, ...rest } = props
  const Element = IconComponent[name]
  return <Element {...rest} />
}

export default Icon
