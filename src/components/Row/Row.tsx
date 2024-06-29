import { View } from 'react-native'
import React, { Ref, forwardRef } from 'react'
import { ViewCustomProps } from './Row.types'
import { convertSpaceSize } from 'lib'

const Row = forwardRef((props: ViewCustomProps, ref: Ref<any>) => {
  const {
    children,
    style,
    flexDirection,
    alignItems,
    flex,
    alignContent,
    alignSelf,
    justifyContent,
    gap: _gap,
    ...rest
  } = props

  const gap = _gap ? convertSpaceSize(_gap) : 0
  return (
    <View
      ref={ref}
      {...rest}
      style={[
        {
          flexDirection: flexDirection ?? 'row',
          alignItems: alignItems ?? 'center',
          flex,
          alignContent,
          alignSelf,
          justifyContent,
          gap
        },
        style
      ]}>
      {children}
    </View>
  )
})

export default Row
