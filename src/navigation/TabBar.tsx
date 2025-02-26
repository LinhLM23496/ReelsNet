import React, { useEffect, useState } from 'react'
import {
  Keyboard,
  View,
  TouchableOpacity,
  StyleSheet,
  Linking
} from 'react-native'
import { BottomTabBarProps } from '@react-navigation/bottom-tabs'
import { HEIGHT_BOTTOM_BAR, color, space } from 'themes'
import { Icon } from 'components'
import { IconComponent } from 'components/Icon/Icon'
import NavigationService from './NavigationService'
import Route from './Route'
import { usePermission } from 'hooks'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useDispatch } from 'react-redux'
import { onModal } from 'stores/modal'

interface DetailTabProps {
  icon: keyof typeof IconComponent
}

const detailTab = (name: string): DetailTabProps => {
  switch (name) {
    case 'CreatePost':
      return { icon: 'plus' }

    case 'Settings':
      return { icon: 'setting' }

    default:
      return { icon: 'home' }
  }
}

const TabBar: React.FC<BottomTabBarProps> = ({
  state,
  descriptors,
  navigation
}) => {
  const dispatch = useDispatch()
  const { bottom } = useSafeAreaInsets()
  const { requestMultiPermission } = usePermission()
  const [visit, setVisit] = useState(true)

  useEffect(() => {
    const showSubscription = Keyboard.addListener('keyboardDidShow', () => {
      setVisit(false)
    })
    const hideSubscription = Keyboard.addListener('keyboardDidHide', () => {
      setVisit(true)
    })

    return () => {
      showSubscription.remove()
      hideSubscription.remove()
    }
  }, [])

  const handleCreatePost = async () => {
    try {
      await requestMultiPermission(['library'])
      NavigationService.push(Route.CreatePost)
    } catch (error) {
      dispatch<any>(
        onModal({
          display: true,
          title: 'Allow ReelsNet to access your photos?',
          content:
            'Turn on Photos service to allow ReelsNet to access your photos.',
          button: [
            {
              variant: 'ghost',
              title: 'Discard',
              onPress: () => {}
            },
            {
              title: 'Settings',
              onPress: () => Linking.openSettings()
            }
          ]
        })
      )
    }
  }

  return visit ? (
    <View style={[styles.container, { paddingBottom: bottom }]}>
      {state.routes.map((route: any, index: number) => {
        const { options } = descriptors[route.key]
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name

        const { icon } = detailTab(label)

        const isFocused = state.index === index

        const onPress = async () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true
          })

          const disabled = isFocused && event.defaultPrevented
          if (disabled) return

          if (label === 'CreatePost') {
            handleCreatePost()
          } else {
            navigation.navigate({
              name: route.name,
              params: route.params,
              merge: true
            })
          }
        }

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key
          })
        }

        return (
          <TouchableOpacity
            key={route.key}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={[
              styles.tabBar,
              {
                borderColor: isFocused ? color.primary : color.transparent
              }
            ]}>
            <Icon name={icon} color={isFocused ? color.primary : color.gray} />
          </TouchableOpacity>
        )
      })}
    </View>
  ) : null
}

export default TabBar

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: color.white
  },
  tabBar: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: HEIGHT_BOTTOM_BAR,
    borderTopWidth: 1
  },
  redDot: {
    position: 'absolute',
    top: space.xxs / 2
  },
  subRedDot: {
    marginLeft: space.m
  }
})
