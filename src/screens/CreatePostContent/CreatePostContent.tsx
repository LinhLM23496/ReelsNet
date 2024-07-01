import {
  FlatList,
  Image,
  ScrollView,
  Switch,
  TouchableOpacity,
  View
} from 'react-native'
import React, { FC, useRef } from 'react'
import {
  Button,
  Icon,
  Input,
  NavigationBar,
  Row,
  SafeView,
  Text
} from 'components'
import { HEIGHT_NAVIGATION_BAR, color, colorRange, space } from 'themes'
import { NavigationService, ScreenProps } from 'navigation'
import { ImageType } from 'hooks/useGallery'
import { Controller, useForm } from 'react-hook-form'
import { BottomSheetModal } from '@gorhom/bottom-sheet'
import BottomSheetAdvanced from './components/BottomSheetAdvanced'
import { DataType, PostParams } from './CreatePostContent.types'
import { styles } from './CreatePostContent.styles'

const CreatePostContent: FC<ScreenProps<'CreatePostContent'>> = ({ route }) => {
  const media = route.params?.media
  const scrollEnabled = media.length > 1
  const paddingHorizontal = scrollEnabled ? space.m : space.half_width / 2
  const bottomSheetRef = useRef<BottomSheetModal>(null)

  const { control, handleSubmit, setValue, watch } = useForm<PostParams>({
    mode: 'all',
    defaultValues: {
      media,
      tagAI: false,
      shareFacebook: false,
      showLike: false,
      showShare: false,
      isComment: false
    }
  })

  const getLocaltion = () => {
    // TODO: navigation screen add location or turn on bottomsheet
    // TODO: get current location of user
    // TODO: or, navigation screen add Location (search address and select location for form)
    console.log('getLocaltion')
  }

  const toggleAI = () => {
    // TODO: toggle Add Tag by AI
    console.log('toggleAI')
  }

  const shareFb = () => {
    // TODO: share facebook
    // TODO: turn on link on facebook to account
    console.log('shareFb')
  }

  const addTagUser = () => {
    // TODO: add tag user
    // TODO: navigation screen add Tag user => select friend on list
    console.log('addTagUser')
  }

  const DATA: DataType[] = [
    {
      id: '0',
      name: 'content',
      variant: 'input'
    },
    {
      id: '1',
      name: 'tagUsers',
      title: 'Gắn thẻ người khác',
      icon: 'tagUser',
      variant: 'navigation',
      action: () => addTagUser()
    },
    {
      id: '2',
      name: 'location',
      title: 'Add location',
      icon: 'location',
      variant: 'function',
      action: () => getLocaltion()
    },
    {
      id: '3',
      name: 'music',
      title: 'Add Music',
      icon: 'music',
      variant: 'navigation' // TODO: add music
      // TODO: navigation screen add music or turn on bottomsheet
      // TODO: search music and select music
    },
    {
      id: '4',
      name: 'tagAI',
      title: 'Add Tag by AI',
      subTitle: 'Tag people in the photo by AI',
      icon: 'tag',
      variant: 'toggle',
      action: () => toggleAI()
    },
    {
      id: '5',
      name: 'shareFacebook',
      title: 'Share on Facebook',
      icon: 'facebook',
      variant: 'toggle',
      action: () => shareFb()
    },
    {
      id: '6',
      name: 'showLike',
      title: 'Advanced settings',
      icon: 'setting',
      variant: 'function',
      action: () => bottomSheetRef.current?.present()
    }
  ]

  const onSubmit = (data: PostParams) => {
    console.log('data', data)
    // TODO: create formData and call api create Post
    // TODO: or, send media to server => get uri media. create Data and call api create Post
  }

  const renderItem = (item: any) => {
    const { id, variant, title, subTitle, icon, action, value, onChange } = item
    const disabled = variant === 'toggle' ? true : false

    const handleAction = () => {
      if (disabled) return
      if (typeof action === 'function') {
        action()
      } else {
        action && NavigationService.push(action)
      }
    }

    const renderIconRight = () => {
      switch (variant) {
        case 'navigation':
        case 'function':
          return (
            <Icon name="arrow-right" size="m" color={colorRange.gray[400]} />
          )
        case 'toggle':
          return (
            <Switch
              trackColor={{
                false: colorRange.gray[200],
                true: color.primary
              }}
              thumbColor={color.white}
              ios_backgroundColor={color.gray}
              onValueChange={(value) => onChange(value)}
              value={value}
            />
          )
      }
    }

    if (variant === 'input') {
      return (
        <Input
          variant="ghost"
          placeholder="Write something..."
          multiline
          numberOfLines={4}
          value={value}
          onChangeText={onChange}
          style={styles.input}
        />
      )
    }

    return (
      <TouchableOpacity
        activeOpacity={1}
        disabled={disabled}
        onPress={handleAction}
        key={id}
        style={styles.action}>
        <Row flex={1} gap="s">
          <Icon name={icon} size="m" />
          <View>
            <Text>{title}</Text>
            {subTitle ? (
              <Text size="s" color={colorRange.gray[400]}>
                {subTitle}
              </Text>
            ) : null}
          </View>
        </Row>
        {renderIconRight()}
      </TouchableOpacity>
    )
  }

  const renderMedia = ({ item }: { item: ImageType }) => {
    const { uri } = item
    return <Image source={{ uri }} resizeMode="contain" style={styles.item} />
  }

  return (
    <View style={styles.container}>
      <NavigationBar absolute title="Create Post" />
      <SafeView marginTop={HEIGHT_NAVIGATION_BAR} style={styles.container}>
        <ScrollView
          keyboardDismissMode="on-drag"
          style={styles.container}
          contentContainerStyle={styles.subContainer}>
          <FlatList
            horizontal
            scrollEnabled={scrollEnabled}
            data={media}
            keyExtractor={(item) => item.uri}
            renderItem={renderMedia}
            contentContainerStyle={[
              styles.containerContent,
              {
                paddingHorizontal
              }
            ]}
            showsHorizontalScrollIndicator={false}
          />
          <View>
            {DATA.map(({ name, ...rest }) => (
              <Controller
                key={name}
                control={control}
                name={name}
                render={({ field: { onChange, value } }) =>
                  renderItem({ ...rest, value, onChange })
                }
              />
            ))}
          </View>
        </ScrollView>
        <View style={styles.containerButton}>
          <Button title="Post" isFullWidth onPress={handleSubmit(onSubmit)} />
        </View>
        <BottomSheetAdvanced
          bottomSheetRef={bottomSheetRef}
          setValue={setValue}
          watch={watch}
        />
      </SafeView>
    </View>
  )
}

export default CreatePostContent
