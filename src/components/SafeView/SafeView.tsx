import { View } from 'react-native'
import React from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { Props } from './SafeView.types'

const SafeView = ({
  children,
  marginTop: _marginTop = 0,
  marginBottom: _marginBottom = 0,
  flex,
  style,
  ...rest
}: Props) => {
  const { top, bottom } = useSafeAreaInsets()
  const marginTop = top + _marginTop
  const marginBottom = bottom + _marginBottom
  return (
    <View {...rest} style={[{ marginTop, marginBottom, flex }, style]}>
      {children}
    </View>
  )
}

export default SafeView
