import React, { FC, useCallback } from 'react'
import { View, TouchableOpacity } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { NavigationService } from 'navigation'
import { Icon, Text } from 'components'
import { NavigationBarProps } from './NavigationBar.types'
import { styles } from './NavigationBar.styles'

const NavigationBar: FC<NavigationBarProps> = (props) => {
  const {
    style: containerStyle,
    onBackPress,
    title = '',
    subTitle,
    subTitleStyle,
    ElementLeft,
    ElementRight,
    buttonStyle,
    hideBack = false,
    titleStyle,
    numberOfLines = 1,
    backgroundColor,
    fontSize = 'l',
    adjustsFontSizeToFit,
    absolute,
    onPressTitle,
    transparent,
    iconLeft
  } = props

  const { top } = useSafeAreaInsets()
  const renderTitle = useCallback(() => {
    switch (typeof title) {
      case 'string':
        return (
          <Text
            adjustsFontSizeToFit={adjustsFontSizeToFit}
            numberOfLines={numberOfLines}
            size={fontSize}
            onPress={onPressTitle}
            style={[styles.title, titleStyle]}>
            {title}
          </Text>
        )
      case 'function':
        return title()
      default:
        return null
    }
  }, [
    adjustsFontSizeToFit,
    fontSize,
    numberOfLines,
    onPressTitle,
    title,
    titleStyle
  ])

  return (
    <View
      style={[
        styles.container,
        { backgroundColor, marginTop: top },
        containerStyle,
        absolute ? styles.absolute : {},
        transparent ? styles.transparent : {}
      ]}>
      <View style={styles.accessory}>
        {ElementLeft ? (
          ElementLeft
        ) : !hideBack ? (
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={onBackPress ?? NavigationService.goBack}
            style={[styles.buttonAccessory, buttonStyle]}>
            <Icon name={iconLeft ?? 'arrow-left'} />
          </TouchableOpacity>
        ) : null}
      </View>
      <View style={styles.center}>
        {renderTitle()}
        {subTitle ? (
          <Text
            size="s"
            numberOfLines={1}
            style={[styles.subTitle, subTitleStyle]}>
            {subTitle}
          </Text>
        ) : null}
      </View>

      <View style={[styles.accessory, styles.accessoryRight]}>
        {ElementRight ? ElementRight : undefined}
      </View>
    </View>
  )
}

export default NavigationBar
