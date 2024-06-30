import { TextInput, TouchableOpacity, View } from 'react-native'
import React, { Ref, forwardRef, useImperativeHandle, useRef } from 'react'
import { Icon, Row, Text } from 'components'
import { color, colorRange, space } from 'themes'
import { InputProps, InputRef } from './Input.types'
import { styles } from './Input.styles'

const Input = forwardRef((props: InputProps, ref: Ref<InputRef>) => {
  const {
    variant = 'filled',
    label,
    labelProps,
    labelStyle,
    contentStyle,
    style,
    iconName,
    iconSize,
    iconColor,
    onPressIcon,
    inputStyle,
    ElementLeft,
    ElementRight,
    showClear,
    onClear,
    maxLength,
    ...rest
  } = props

  const inputRef = useRef<TextInput>(null)
  const backgroundColor = variant === 'filled' ? color.white : color.transparent
  const paddingTop = props.multiline ? space.xxs : 0

  useImperativeHandle(ref, () => ({
    clear: () => {
      inputRef.current?.clear()
    }
  }))

  const handleClear = () => {
    inputRef.current?.clear()
    inputRef.current?.focus()
    props.onChangeText?.('')
    onClear?.()
  }

  return (
    <View style={[styles.container, style]}>
      {label ? (
        <Text
          fontWeight="600"
          style={[styles.label, labelStyle]}
          {...labelProps}>
          {label}
        </Text>
      ) : null}
      <Row style={[styles.content, { backgroundColor }, contentStyle]}>
        {ElementLeft ? (
          ElementLeft
        ) : iconName ? (
          <TouchableOpacity
            activeOpacity={0.8}
            disabled={!onPressIcon}
            onPress={onPressIcon}>
            <Icon name={iconName} size={iconSize} color={iconColor} />
          </TouchableOpacity>
        ) : null}
        <TextInput
          ref={inputRef}
          {...rest}
          textAlignVertical={props.multiline ? 'top' : 'center'}
          maxLength={maxLength}
          placeholderTextColor={colorRange.gray[400]}
          style={[styles.inputStyle, { paddingTop }, inputStyle]}
        />
        {showClear && props?.value?.length ? (
          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.iconRight}
            onPress={handleClear}>
            <Icon name={'close'} color={colorRange.gray[700]} />
          </TouchableOpacity>
        ) : null}
        {ElementRight ? ElementRight : null}
      </Row>
    </View>
  )
})

export default Input
