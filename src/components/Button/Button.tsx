import React from 'react'
import { TouchableOpacity, ActivityIndicator, ViewStyle } from 'react-native'
import { color, colorRange, space } from 'themes'
import { IButtonProps } from './Button.types'
import { styles } from './Button.styles'
import Icon from 'components/Icon/Icon'
import Text from 'components/Text/Text'

function Button(props: IButtonProps) {
  const {
    title,
    onPress,
    variant = 'filled',
    iconName,
    iconSize = 'm',
    iconColor,
    style,
    styleContent,
    disabled,
    loading,
    ElementLeft,
    ElementRight,
    spacing: _spacing = 's',
    borderRadius: _borderRadius = 'width',
    isFullWidth,
    fontSize: _fontSize,
    colorText: _colorText,
    backgroundColor: _backgroundColor,
    ...rest
  } = props

  const spacing = space[_spacing]
  const borderRadius = space[_borderRadius]

  const isFilled = variant === 'filled'
  const isGhost = variant === 'ghost'
  const ElementRightToRender = ElementRight ?? null
  const ElementLeftToRender = ElementLeft ?? null
  const colorText = disabled
    ? colorRange.gray[100]
    : _colorText
    ? _colorText
    : isFilled
    ? color.white
    : color.primary

  const backgroundColor = _backgroundColor
    ? _backgroundColor
    : isGhost
    ? color.transparent
    : !isFilled
    ? color.white
    : disabled
    ? color.gray
    : color.primary

  const borderColor = _backgroundColor
    ? _backgroundColor
    : isGhost
    ? color.transparent
    : disabled
    ? color.gray
    : color.primary
  const width = isFullWidth ? '100%' : 'auto'
  const alignSelf = iconName ? 'center' : 'flex-start'
  const aspectRatio = iconName && !title && !isFullWidth ? 1 : 'auto'
  const paddingHorizontal = title ? spacing / 0.6 : iconName ? spacing : 0

  const styleContainer: ViewStyle = {
    borderRadius,
    paddingVertical: spacing,
    paddingHorizontal,
    aspectRatio,
    backgroundColor,
    borderColor,
    alignSelf,
    width
  }
  const colorLoading = isFilled ? color.white : color.primary
  const disabledPress = disabled || loading

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={[styles.container, styleContainer, style]}
      disabled={disabledPress}
      onPress={onPress}
      {...rest}>
      {loading ? (
        <ActivityIndicator color={colorLoading} style={styles.icon} />
      ) : iconName ? (
        <Icon name={iconName} size={iconSize} color={iconColor} />
      ) : (
        ElementLeftToRender
      )}
      {title && (
        <Text
          color={colorText}
          textAlign="center"
          numberOfLines={1}
          adjustsFontSizeToFit
          size={_fontSize}
          fontWeight="500"
          style={styleContent}>
          {title}
        </Text>
      )}
      {ElementRightToRender}
    </TouchableOpacity>
  )
}

export default Button
