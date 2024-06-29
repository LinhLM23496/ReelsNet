import React, { FC, Ref, forwardRef, useMemo } from 'react'
import { Text as RNText, StyleProp, TextStyle } from 'react-native'
import { TextPropsType } from './Text.types'
import { color, fontSize as FontSize } from 'themes'

const Text: FC<TextPropsType> = forwardRef((props, ref?: Ref<RNText>) => {
  const {
    children,
    fontWeight,
    textAlign,
    size = 'm',
    color: _color = color.black,
    style: styleContainer,
    ...rest
  } = props

  const mergeStyles: StyleProp<TextStyle> = useMemo(() => {
    if (!Array.isArray(styleContainer)) {
      return styleContainer
    }
    const mergedStyle = {}
    styleContainer.forEach((style) => {
      if (style) {
        Object.assign(mergedStyle, style)
      }
    })

    return mergedStyle
  }, [styleContainer])

  const textSize = mergeStyles?.fontSize || FontSize[size]

  return (
    <RNText
      ref={ref}
      {...rest}
      style={[
        {
          fontSize: textSize,
          fontWeight,
          textAlign,
          color: _color,
          lineHeight: lineHeight(textSize)
        },
        mergeStyles
      ]}>
      {children}
    </RNText>
  )
})

export default Text

const lineHeight = (size: number) => Number(size * 1.4)
