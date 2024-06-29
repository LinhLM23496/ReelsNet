import { View, ViewProps } from 'react-native'
import React from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

type Props = ViewProps & {
  marginTop?: number
  marginBottom?: number
}

const SafeView = ({
  children,
  marginTop: _marginTop = 0,
  marginBottom: _marginBottom = 0,
  style,
  ...rest
}: Props) => {
  const { top, bottom } = useSafeAreaInsets()
  const marginTop = top + _marginTop
  const marginBottom = bottom + _marginBottom
  return (
    <View {...rest} style={[{ marginTop, marginBottom }, style]}>
      {children}
    </View>
  )
}

export default SafeView
