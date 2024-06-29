import React from 'react'
import {
  IconArrowLeft,
  IconClose,
  IconHome,
  IconPlus,
  IconSearch,
  IconSetting
} from 'assets'
import { Props } from './Icon.types'

const IconComponent = {
  'arrow-left': IconArrowLeft,
  plus: IconPlus,
  settings: IconSetting,
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
